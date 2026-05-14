'use client';

import { useEffect, useState, useTransition } from 'react';
import { supabase, type Reservation, type BlogPost } from '@/lib/supabase';
import { updateReservationStatus, saveBlogPost, deleteBlogPost, adminLogout } from '@/app/actions/admin';

const BLOG_CATEGORIES = ['장사노하우', '재료이야기', '레시피', '일상'];

const STATUS_LABEL: Record<string, string> = {
  pending: '대기',
  confirmed: '확정',
  cancelled: '취소',
};
const STATUS_COLOR: Record<string, string> = {
  pending: '#c8a96e',
  confirmed: '#6ec87a',
  cancelled: '#e06060',
};

const cellStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: 13, color: 'rgba(255,255,255,0.75)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  verticalAlign: 'middle',
};

export default function AdminPage() {
  const [tab, setTab] = useState<'reservations' | 'blog'>('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [formMsg, setFormMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      let q = supabase.from('reservations').select('*').order('date').order('time');
      if (dateFilter) q = q.eq('date', dateFilter);
      const { data } = await q;
      if (!cancelled) setReservations(data ?? []);
    };
    load();
    return () => { cancelled = true; };
  }, [dateFilter]);

  useEffect(() => {
    if (tab !== 'blog') return;
    let cancelled = false;
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (!cancelled) setPosts(data ?? []); });
    return () => { cancelled = true; };
  }, [tab]);

  const loadReservations = async () => {
    let q = supabase.from('reservations').select('*').order('date').order('time');
    if (dateFilter) q = q.eq('date', dateFilter);
    const { data } = await q;
    setReservations(data ?? []);
  };

  const loadPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data ?? []);
  };

  const changeStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    startTransition(async () => {
      await updateReservationStatus(id, status);
      await loadReservations();
    });
  };

  const handleSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (editPost) fd.append('id', editPost.id);
    startTransition(async () => {
      const r = await saveBlogPost(fd);
      if (r.error) { setFormMsg(r.error); return; }
      setShowForm(false); setEditPost(null);
      await loadPosts();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    startTransition(async () => { await deleteBlogPost(id); await loadPosts(); });
  };

  const tabStyle = (t: string): React.CSSProperties => ({
    padding: '10px 24px',
    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
    fontWeight: tab === t ? 600 : 400,
    color: tab === t ? '#c8a96e' : 'rgba(255,255,255,0.4)',
    background: 'transparent', border: 'none',
    borderBottom: tab === t ? '2px solid #c8a96e' : '2px solid transparent',
    marginBottom: -1, cursor: 'pointer', transition: 'color 0.2s',
  });

  const inputSt: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,169,110,0.25)',
    borderRadius: 3, color: '#fff',
    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* 어드민 헤더 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 60,
        borderBottom: '1px solid rgba(200,169,110,0.15)',
        position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 100,
      }}>
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, fontWeight: 700, color: '#c8a96e' }}>
          옥된장 어드민
        </span>
        <button onClick={() => startTransition(() => adminLogout())} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.5)', fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 12, padding: '6px 16px', borderRadius: 3, cursor: 'pointer',
        }}>
          로그아웃
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px' }}>
        {/* 탭 */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }}>
          <button style={tabStyle('reservations')} onClick={() => setTab('reservations')}>예약 관리</button>
          <button style={tabStyle('blog')} onClick={() => setTab('blog')}>블로그 관리</button>
        </div>

        {/* ── 예약 관리 ── */}
        {tab === 'reservations' && (
          <div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
              <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
                style={{ ...inputSt, width: 180, colorScheme: 'dark' }} />
              {dateFilter && (
                <button onClick={() => setDateFilter('')} style={{
                  background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)',
                  fontSize: 12, cursor: 'pointer', fontFamily: "'Noto Sans KR', sans-serif",
                }}>
                  필터 초기화
                </button>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['날짜', '시간', '이름', '연락처', '인원', '상태', '요청사항', '관리'].map(h => (
                      <th key={h} style={{
                        ...cellStyle, color: 'rgba(255,255,255,0.35)',
                        fontSize: 11, letterSpacing: '0.1em', fontWeight: 400,
                        textAlign: 'left', borderBottom: '1px solid rgba(200,169,110,0.2)',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr><td colSpan={8} style={{ ...cellStyle, color: 'rgba(255,255,255,0.25)', textAlign: 'center', padding: 48 }}>예약 없음</td></tr>
                  ) : reservations.map(r => (
                    <tr key={r.id}>
                      <td style={cellStyle}>{r.date}</td>
                      <td style={cellStyle}>{r.time}</td>
                      <td style={cellStyle}>{r.name}</td>
                      <td style={cellStyle}>{r.phone}</td>
                      <td style={cellStyle}>{r.party_size}명</td>
                      <td style={cellStyle}>
                        <span style={{ color: STATUS_COLOR[r.status], fontSize: 12, fontWeight: 600 }}>
                          {STATUS_LABEL[r.status]}
                        </span>
                      </td>
                      <td style={{ ...cellStyle, maxWidth: 200, color: 'rgba(255,255,255,0.45)' }}>{r.notes ?? '-'}</td>
                      <td style={cellStyle}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {r.status !== 'confirmed' && (
                            <button onClick={() => changeStatus(r.id, 'confirmed')} disabled={isPending} style={{
                              padding: '4px 10px', background: 'rgba(110,200,122,0.15)',
                              border: '1px solid rgba(110,200,122,0.4)', color: '#6ec87a',
                              fontSize: 11, cursor: 'pointer', borderRadius: 2,
                              fontFamily: "'Noto Sans KR', sans-serif",
                            }}>확정</button>
                          )}
                          {r.status !== 'cancelled' && (
                            <button onClick={() => changeStatus(r.id, 'cancelled')} disabled={isPending} style={{
                              padding: '4px 10px', background: 'rgba(224,96,96,0.15)',
                              border: '1px solid rgba(224,96,96,0.4)', color: '#e06060',
                              fontSize: 11, cursor: 'pointer', borderRadius: 2,
                              fontFamily: "'Noto Sans KR', sans-serif",
                            }}>취소</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 블로그 관리 ── */}
        {tab === 'blog' && (
          <div>
            <button onClick={() => { setShowForm(true); setEditPost(null); setFormMsg(''); }} style={{
              padding: '10px 24px', background: '#c8a96e', color: '#000',
              fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, fontWeight: 700,
              border: 'none', cursor: 'pointer', borderRadius: 3, marginBottom: 32,
            }}>
              + 새 글 작성
            </button>

            {/* 글쓰기 폼 */}
            {showForm && (
              <form onSubmit={handleSavePost} style={{
                border: '1px solid rgba(200,169,110,0.2)', borderRadius: 4,
                padding: 28, marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <h3 style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#fff', fontSize: 15, margin: 0 }}>
                  {editPost ? '글 수정' : '새 글 작성'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>제목 *</label>
                    <input name="title" required defaultValue={editPost?.title} style={inputSt} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>슬러그 (URL) *</label>
                    <input name="slug" required defaultValue={editPost?.slug} placeholder="my-post-title" style={inputSt} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>카테고리 *</label>
                    <select name="category" required defaultValue={editPost?.category} style={{ ...inputSt, cursor: 'pointer' }}>
                      {BLOG_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>커버 이미지 URL</label>
                    <input name="cover_image_url" defaultValue={editPost?.cover_image_url ?? ''} style={inputSt} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>요약</label>
                  <input name="excerpt" defaultValue={editPost?.excerpt ?? ''} style={inputSt} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>본문 *</label>
                  <textarea name="content" required rows={10} defaultValue={editPost?.content} style={{ ...inputSt, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" name="published" value="true" id="published" defaultChecked={editPost?.published} style={{ accentColor: '#c8a96e' }} />
                  <label htmlFor="published" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>공개</label>
                </div>
                {formMsg && <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#e06060' }}>{formMsg}</p>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" disabled={isPending} style={{
                    padding: '10px 24px', background: '#c8a96e', color: '#000',
                    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, fontWeight: 700,
                    border: 'none', cursor: isPending ? 'wait' : 'pointer', borderRadius: 3,
                  }}>
                    {isPending ? '저장 중...' : '저장'}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditPost(null); }} style={{
                    padding: '10px 24px', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, cursor: 'pointer', borderRadius: 3,
                  }}>
                    취소
                  </button>
                </div>
              </form>
            )}

            {/* 글 목록 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {posts.map(p => (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  gap: 16,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c8a96e', letterSpacing: '0.15em' }}>{p.category}</span>
                    <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: '#fff', margin: '4px 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: p.published ? 'rgba(110,200,122,0.8)' : 'rgba(255,255,255,0.25)' }}>
                      {p.published ? '● 공개' : '○ 비공개'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => { setEditPost(p); setShowForm(true); setFormMsg(''); }} style={{
                      padding: '5px 14px', background: 'transparent',
                      border: '1px solid rgba(200,169,110,0.3)', color: '#c8a96e',
                      fontSize: 12, cursor: 'pointer', borderRadius: 2,
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}>수정</button>
                    <button onClick={() => handleDelete(p.id)} disabled={isPending} style={{
                      padding: '5px 14px', background: 'transparent',
                      border: '1px solid rgba(224,96,96,0.3)', color: '#e06060',
                      fontSize: 12, cursor: 'pointer', borderRadius: 2,
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}>삭제</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.25)', padding: '32px 0' }}>작성된 글이 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

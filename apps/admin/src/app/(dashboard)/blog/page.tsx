'use client';

import { useEffect, useState, useTransition } from 'react';
import type { BlogPost } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { saveBlogPost, deleteBlogPost } from '@/app/actions';

const CATEGORIES = ['장사노하우', '재료이야기', '레시피', '일상'];

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,169,110,0.2)',
  borderRadius: 3, color: '#fff',
  fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
  outline: 'none', boxSizing: 'border-box',
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMsg, setFormMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    const { data } = await supabase
      .from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditPost(null); setShowForm(true); setFormMsg(''); };
  const openEdit = (p: BlogPost) => { setEditPost(p); setShowForm(true); setFormMsg(''); };
  const closeForm = () => { setShowForm(false); setEditPost(null); };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (editPost) fd.append('id', editPost.id);
    startTransition(async () => {
      const r = await saveBlogPost(fd);
      if (r.error) { setFormMsg(r.error); return; }
      closeForm();
      await load();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    startTransition(async () => { await deleteBlogPost(id); await load(); });
  };

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 8 }}>BLOG</p>
        <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, fontWeight: 300, color: '#fff' }}>블로그 관리</h1>
      </div>

      {!showForm && (
        <button onClick={openNew} style={{
          padding: '10px 24px', background: '#c8a96e', color: '#000',
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, fontWeight: 700,
          border: 'none', cursor: 'pointer', borderRadius: 3, marginBottom: 32,
        }}>
          + 새 글 작성
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSave} style={{
          border: '1px solid rgba(200,169,110,0.2)', borderRadius: 4,
          padding: 28, marginBottom: 40,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#c8a96e', fontSize: 14, fontWeight: 600 }}>
              {editPost ? '글 수정' : '새 글 작성'}
            </h3>
            <button type="button" onClick={closeForm} style={{
              background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)',
              cursor: 'pointer', fontSize: 18, lineHeight: 1,
            }}>×</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>제목 *</label>
              <input name="title" required defaultValue={editPost?.title} style={inp} />
            </div>
            <div>
              <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>슬러그 *</label>
              <input name="slug" required defaultValue={editPost?.slug} placeholder="my-post-title" style={inp} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>카테고리 *</label>
              <select name="category" required defaultValue={editPost?.category ?? CATEGORIES[0]} style={{ ...inp, cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>커버 이미지 URL</label>
              <input name="cover_image_url" defaultValue={editPost?.cover_image_url ?? ''} style={inp} />
            </div>
          </div>

          <div>
            <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>요약</label>
            <input name="excerpt" defaultValue={editPost?.excerpt ?? ''} style={inp} />
          </div>

          <div>
            <label style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>본문 *</label>
            <textarea name="content" required rows={12} defaultValue={editPost?.content}
              style={{ ...inp, resize: 'vertical', lineHeight: 1.8 }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" name="published" value="true" id="published"
              defaultChecked={editPost?.published ?? false}
              style={{ accentColor: '#c8a96e', width: 16, height: 16 }} />
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
            <button type="button" onClick={closeForm} style={{
              padding: '10px 24px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)',
              fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, cursor: 'pointer', borderRadius: 3,
            }}>
              취소
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 16,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c8a96e', letterSpacing: '0.15em' }}>{p.category}</span>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: 10,
                  color: p.published ? 'rgba(110,200,122,0.8)' : 'rgba(255,255,255,0.2)',
                }}>
                  {p.published ? '● 공개' : '○ 비공개'}
                </span>
              </div>
              <p style={{
                fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: '#fff',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0,
              }}>
                {p.title}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(p)} style={{
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
          <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.25)', padding: '40px 0' }}>
            작성된 글이 없습니다.
          </p>
        )}
      </div>
    </>
  );
}

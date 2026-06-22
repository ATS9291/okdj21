export async function sendSms(phone: string, message: string) {
  const form = new FormData();
  form.append('key',         process.env.ALIGO_API_KEY!);
  form.append('user_id',     process.env.ALIGO_USER_ID!);
  form.append('sender',      process.env.ALIGO_SENDER!);
  form.append('receiver',    phone.replace(/-/g, ''));
  form.append('msg',         message);
  form.append('testmode_yn', 'N');
  const res = await fetch('https://apis.aligo.in/send/', { method: 'POST', body: form });
  return res.json();
}

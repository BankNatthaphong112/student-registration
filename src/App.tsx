import { ChangeEvent, FormEvent, useState } from 'react'
import {
  CheckCircle2, ClipboardCheck, FileUp, Info, Mail, Phone,
  RotateCcw, Send, UserRound, UsersRound, BriefcaseBusiness
} from 'lucide-react'

type Errors = Record<string, string>
type FormData = {
  studentId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  gender: string
  department: string
  experience: string
  interests: string[]
  file: File | null
  comment: string
  terms: boolean
}

const initialForm: FormData = {
  studentId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  department: '',
  experience: 'ไม่มีประสบการณ์',
  interests: [],
  file: null,
  comment: '',
  terms: false,
}

function App() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
    setSubmitted(false)
  }

  const validate = () => {
    const e: Errors = {}
    if (!/^\d{10}$/.test(form.studentId.trim())) e.studentId = 'รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก'
    if (form.firstName.trim().length < 2) e.firstName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร'
    if (form.lastName.trim().length < 2) e.lastName = 'กรุณากรอกนามสกุลอย่างน้อย 2 ตัวอักษร'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    // Intentional QA bug preserved from the original HTML: 9 digits incorrectly passes.
    if (!/^\d{9,10}$/.test(form.phone.trim())) e.phone = 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก'
    if (!form.dob) e.dob = 'กรุณาเลือกวันเกิด'
    else if (new Date(form.dob) > new Date()) e.dob = 'วันเกิดต้องไม่เป็นวันในอนาคต'
    if (!form.gender) e.gender = 'กรุณาเลือกเพศ'
    if (!form.department) e.department = 'กรุณาเลือกสาขาวิชา / หน่วยงาน'
    // Intentional QA bug preserved: file type is checked but the 5 MB size limit is not.
    if (form.file) {
      const ext = '.' + (form.file.name.split('.').pop() || '').toLowerCase()
      if (!['.pdf', '.jpg', '.jpeg', '.png'].includes(ext)) e.file = 'ชนิดไฟล์ไม่รองรับ'
    }
    if (!form.terms) e.terms = 'กรุณายืนยันเงื่อนไขก่อนส่งข้อมูล'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (validate()) setSubmitted(true)
    else setSubmitted(false)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    update('file', event.target.files?.[0] ?? null)
  }

  const toggleInterest = (interest: string) => {
    const next = form.interests.includes(interest)
      ? form.interests.filter(x => x !== interest)
      : [...form.interests, interest]
    update('interests', next)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-600 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold">
              <ClipboardCheck className="h-6 w-6" />
              Student QA Lab
            </div>
            <p className="mt-1 text-sm text-blue-100">แบบฝึกหัดการออกแบบฟอร์มและทดสอบ Validation</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm backdrop-blur">
            รหัสนักศึกษา: <b>6612345678</b> <span className="mx-1 text-white/40">|</span> ชื่อ: <b>ณัฐพงษ์ เจริญตา</b>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="mb-7">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> QA PRACTICE
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            แบบฟอร์มลงทะเบียนเข้าร่วมกิจกรรม
          </h1>
          <p className="mt-2 text-slate-500">กรอกข้อมูลให้ครบถ้วน ระบบจะตรวจสอบความถูกต้องของข้อมูลก่อนส่งแบบฟอร์ม</p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/70 px-6 py-6 sm:px-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/20">
                <UserRound className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Student Registration Form</h2>
                <p className="mt-1 text-sm text-slate-500">ช่องที่มีเครื่องหมาย <span className="font-bold text-red-500">*</span> จำเป็นต้องกรอก</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
            <SectionTitle number="1" icon={<UserRound className="h-4 w-4" />} title="ข้อมูลส่วนตัว" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="รหัสนักศึกษา" required error={errors.studentId} hint="กรอกตัวเลข 10 หลัก">
                <input className={`field-input ${errors.studentId ? 'invalid' : ''}`} value={form.studentId} maxLength={10}
                  onChange={e => update('studentId', e.target.value)} placeholder="เช่น 6612345678" />
              </Field>
              <Field label="ชื่อ" required error={errors.firstName}>
                <input className={`field-input ${errors.firstName ? 'invalid' : ''}`} value={form.firstName}
                  onChange={e => update('firstName', e.target.value)} placeholder="เช่น สมชาย" />
              </Field>
              <Field label="นามสกุล" required error={errors.lastName}>
                <input className={`field-input ${errors.lastName ? 'invalid' : ''}`} value={form.lastName}
                  onChange={e => update('lastName', e.target.value)} placeholder="เช่น ใจดี" />
              </Field>
              <Field label="อีเมล" required error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input type="email" className={`field-input pl-11 ${errors.email ? 'invalid' : ''}`} value={form.email}
                    onChange={e => update('email', e.target.value)} placeholder="example@email.com" />
                </div>
              </Field>
              <Field label="เบอร์โทรศัพท์" required error={errors.phone} hint="ต้องเป็นตัวเลข 10 หลัก">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input type="tel" className={`field-input pl-11 ${errors.phone ? 'invalid' : ''}`} value={form.phone} maxLength={10}
                    onChange={e => update('phone', e.target.value)} placeholder="0812345678" />
                </div>
              </Field>
              <Field label="วันเดือนปีเกิด" required error={errors.dob}>
                <input type="date" className={`field-input ${errors.dob ? 'invalid' : ''}`} value={form.dob}
                  onChange={e => update('dob', e.target.value)} />
              </Field>
              <div className="md:col-span-2">
                <ChoiceGroup label="เพศ" required error={errors.gender}>
                  {['ชาย', 'หญิง', 'ไม่ระบุ'].map(g => (
                    <label key={g} className={`choice-card ${form.gender === g ? 'selected' : ''}`}>
                      <input type="radio" name="gender" value={g} checked={form.gender === g}
                        onChange={e => update('gender', e.target.value)} className="h-4 w-4 accent-blue-600" />
                      <span className="font-medium">{g}</span>
                    </label>
                  ))}
                </ChoiceGroup>
              </div>
            </div>

            <div className="my-8 border-t border-slate-100" />
            <SectionTitle number="2" icon={<UsersRound className="h-4 w-4" />} title="ข้อมูลการเข้าร่วม" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="สาขาวิชา / หน่วยงาน" required error={errors.department}>
                <select className={`field-input ${errors.department ? 'invalid' : ''}`} value={form.department}
                  onChange={e => update('department', e.target.value)}>
                  <option value="">-- กรุณาเลือก --</option>
                  <option>เทคโนโลยีสารสนเทศ</option>
                  <option>วิทยาการคอมพิวเตอร์</option>
                  <option>วิศวกรรมซอฟต์แวร์</option>
                  <option>บริหารธุรกิจ</option>
                  <option>อื่น ๆ</option>
                </select>
              </Field>

              <Field label="ประสบการณ์ด้าน IT">
                <select className="field-input" value={form.experience} onChange={e => update('experience', e.target.value)}>
                  <option>ไม่มีประสบการณ์</option><option>น้อยกว่า 1 ปี</option><option>1–3 ปี</option><option>มากกว่า 3 ปี</option>
                </select>
              </Field>

              <div className="md:col-span-2">
                <ChoiceGroup label="หัวข้อที่สนใจ">
                  {['Web Development', 'Software QA', 'UX/UI Design'].map((interest, i) => (
                    <label key={interest} className={`choice-card ${form.interests.includes(['Web','QA','UI'][i]) ? 'selected' : ''}`}>
                      <input type="checkbox" checked={form.interests.includes(['Web','QA','UI'][i])}
                        onChange={() => toggleInterest(['Web','QA','UI'][i])} className="h-4 w-4 rounded accent-blue-600" />
                      <span className="font-medium">{interest}</span>
                    </label>
                  ))}
                </ChoiceGroup>
              </div>

              <div className="md:col-span-2">
                <Field label="แนบเอกสารประกอบ" error={errors.file} hint="รองรับ PDF, JPG, JPEG, PNG ขนาดไม่เกิน 5 MB">
                  <div className={`rounded-2xl border-2 border-dashed p-5 transition ${errors.file ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50'}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <FileUp className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-700">เลือกไฟล์สำหรับแนบเอกสาร</p>
                        <p className="mt-1 truncate text-sm text-slate-500">{form.file ? form.file.name : 'ยังไม่ได้เลือกไฟล์'}</p>
                      </div>
                      <label className="cursor-pointer rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-blue-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
                        เลือกไฟล์
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
                      </label>
                    </div>
                  </div>
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="หมายเหตุเพิ่มเติม">
                  <textarea className="field-input min-h-28 resize-y" maxLength={300} value={form.comment}
                    onChange={e => update('comment', e.target.value)} placeholder="ระบุข้อมูลเพิ่มเติม (ถ้ามี)" />
                  <div className="mt-1.5 text-right text-xs text-slate-400"><span className="font-semibold text-slate-600">{form.comment.length}</span>/300 ตัวอักษร</div>
                </Field>
              </div>

              <div className="md:col-span-2">
                <label className={`choice-card ${form.terms ? 'selected' : ''} ${errors.terms ? 'border-red-400 bg-red-50' : ''}`}>
                  <input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)}
                    className="h-4 w-4 shrink-0 accent-blue-600" />
                  <span className="text-sm leading-6">
                    ฉันยืนยันว่าข้อมูลที่กรอกเป็นความจริงและยอมรับเงื่อนไขการลงทะเบียน <span className="font-bold text-red-500">*</span>
                  </span>
                </label>
                {errors.terms && <ErrorText>{errors.terms}</ErrorText>}
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button type="reset" onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200">
                <RotateCcw className="h-4 w-4" /> ล้างข้อมูล
              </button>
              <button type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                <Send className="h-4 w-4" /> ตรวจสอบและส่งข้อมูล
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mx-6 mb-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 sm:mx-8">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-extrabold">ส่งข้อมูลสำเร็จ!</p>
                  <p className="mt-1 text-sm">ระบบตรวจสอบข้อมูลเบื้องต้นเรียบร้อยแล้ว สามารถใช้หน้านี้เป็นโจทย์สำหรับ Tester ได้</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="pb-8 text-center text-xs text-slate-400">QA Practice Form • React + TypeScript + Tailwind CSS</footer>
    </div>
  )
}

function SectionTitle({ number, title, icon }: { number: string; title: string; icon: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-700">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Section {number}</p>
        <h3 className="text-lg font-extrabold text-blue-950">{title}</h3>
      </div>
    </div>
  )
}

function Field({ label, required, error, hint, children }: { label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      {children}
      {hint && !error && <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400"><Info className="h-3.5 w-3.5" />{hint}</p>}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function ChoiceGroup({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="grid gap-3 md:grid-cols-3">{children}</div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p>
}

export default App

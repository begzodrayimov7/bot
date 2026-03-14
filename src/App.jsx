import { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import './App.css';

const BOT_TOKEN = "8617064495:AAFGD4NGYtB2NjvE1gPIqG07zj0moSx5Eas";
const CHAT_ID = "7925856288";

export default function App() {

  const [sent, setSent] = useState(false)

  async function postTelegram(data) {

    let caption = `
Sizga xabar keldi:

  Ism: ${data.name}
Tel: ${data.phone}
Manzil: ${data.loc}
`

    const formData = new FormData()
    formData.append("chat_id", CHAT_ID)
    formData.append("photo", data.file)   
    formData.append("caption", caption)

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData
    })

    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="wrapper">
      <div className="form-card">

        <h1>Bepul konsultatsiya oling</h1>
        <p>Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz</p>

        <Formik
          initialValues={{ name: "", phone: "", loc: "", file: null }}
          onSubmit={(values, { resetForm }) => {
            postTelegram(values)
            resetForm()
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field placeholder="Ism kiriting" name="name" type="text" />
              <Field placeholder="Tel raqam" name="phone" type="text" />
              <Field placeholder="Manzil" name="loc" type="text" />


              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => {
                  setFieldValue("file", e.currentTarget.files[0])
                }}
              />

              <button type="submit">
                Bepul konsultatsiya olish
              </button>

              {sent && <p className="success">Xabar yuborildi ✅</p>}

            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}
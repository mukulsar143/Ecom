import './contact.css'


export default function Contact() {
  return (
    <>
    <div className="contact">
        <div className="container">
            <div className="form">
                <h2># Contact us</h2>    
                <form >
                    <div className="box">
                        <div className="label">
                            <h4>Name</h4>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Name' name='name' />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>E-Mail</h4>
                        </div>
                        <div className="input">
                            <input type="email" placeholder='E-mail' name='email' />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>Subject</h4>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Subject' name='subject' />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>Message</h4>
                        </div>
                        <div className="input">
                            <textarea placeholder='Message !' name="message" ></textarea>
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>    
        </div>    
    </div>    
    </>
  )
}

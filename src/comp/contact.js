import React, { useState }  from 'react'
import './contact.css'
const Contact = () => {
    const[user, setUser] = useState(
        {
            Name:'', email:'', subject:'', Message:''
        }
    )
        let values, names
    const data = (e) =>
    {
        values = e.target.value
        names = e.target.name
        setUser({...user, [names]: values})
    }

    const send = async (e) =>
    {
        const {Name, email, subject, Message} = user
        e.preventDefault()
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                Name, email, subject, Message
            })
        }

        const send = await fetch(
            'https://react-ecommerce-contact-f9d69-default-rtdb.firebaseio.com/Message.json', option
        )

        if (send) {
            alert("Message sent")
        }
        else
        {
            alert("Error Occured Message sent failed")
        }
    }

  return (
    <>
    <div className='contact'>
        <div className='container'>
            <h2>#contact us</h2>
            <div className='form'>
                <form method='POST'>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Name</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Name' value={user.Name} name='Name' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>E-mail</h4>
                        </div>
                        <div className='input'>
                            <input type='email' placeholder='E-mail' value={user.email} name='email' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Subject</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Subject' value={user.subject} name='subject' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Message</h4>
                        </div>
                        <div className='input'>
                            <textarea placeholder='Message !'  value={user.Message} name='Message' onChange={data}></textarea> 
                        </div>
                    </div>
                    <button type='submit' onClick={send}>Submit</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact
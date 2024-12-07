export default function Postcard() {
    const author: string = "Author";
    const recipient: string = "Recipient";
    const message: string = "Message";
    const image = "https://placehold.co/800x700";
    const date: string = "2021-01-01";
    
    return (
        <div style={{ 
            backgroundImage: `url(${image})`, 
            backgroundSize: 'contain', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            padding: '20px', 
            color: 'white', 
            textShadow: '1px 1px 2px black',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <p style={{ position: 'absolute', top: '20px', left: '20px' }}><strong>To:</strong> {recipient}</p>
            <p style={{ position: 'absolute', top: '20px', right: '20px' }}><strong>From:</strong> {author}</p>
            <p style={{ textAlign: 'center' }}>{message}</p>
            <p style={{ position: 'absolute', bottom: '20px' }}><em>{date}</em></p>
        </div>
    )
}
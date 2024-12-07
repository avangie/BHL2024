export default function Postcard() {
    const author: string = "Author";
    const recipient: string = "Recipient";
    const title: string = "Title";
    const message: string = "Message";
    const image = "https://placehold.co/800x700";
    const date: string = "2021-01-01";
    
    return (
        <div style={{ 
            backgroundImage: `url(${image})`, 
            backgroundSize: 'cover', 
            padding: '20px', 
            color: 'white', 
            textShadow: '1px 1px 2px black' 
        }}>
            <h1>{title}</h1>
            <p>{message}</p>
            <p><strong>From:</strong> {author}</p>
            <p><strong>To:</strong> {recipient}</p>
            <p><em>{date}</em></p>
        </div>
    )
}
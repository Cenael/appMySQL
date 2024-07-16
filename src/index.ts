import express, {Request , Response} from 'express';
import { createClient } from '@vercel/postgres';

const client = createClient({ connectionString: "postgres://default:1eyEAQKVt3Zg@ep-muddy-cake-a4q2w809.us-east-1.aws.neon.tech:5432/verceldb"}) //chiamare il Client
client.connect(); //connetto con il client

const app = express ()
const port = 3000;
const server = express.json(); //gestisci le API utilizzando il formato json (restfull API)

app.use(server)



app.get('/posts', async function(req: Request, res:Response){
    const resp = await client.query("SELECT * FROM posts") //aspetto il risultato 
    res.status(200).json(resp.rows) //ritorna un oggetto che contiene una serie di informazioni            
    
    
}) 


app.post('/posts', function(req: Request, res:Response){     
   client.query("INSERT INTO posts (title, content) VALUES ($1, $2)", [req.body.title, req.body.content], function(error){
        if (error) return res.status(400).json({})
            else return res.status(200).json({})
})
})

app.put('/posts/:postID',  function(req: Request, res:Response){   
   client.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3", [req.body.title, req.body.content, req.params.postID], function(error){
        if (error) return res.status(400).json({})
            else return res.status(200).json({})
})
}) //aspetto il risultato 
 //Update

app.delete('/posts/:postID',  function(req: Request, res:Response){
  client.query("DELETE FROM posts WHERE id=$1", [req.params.postID], function(error) { 
        if (error) return res.status(400).json({})
            else return res.status(200).json({message: "deleted"})
        
    } ) //aspetto il risultato 




}) //Delete


app.listen(port, function(){       
    console.log(`Server is running at http://localhost:${port}`)
})






















































































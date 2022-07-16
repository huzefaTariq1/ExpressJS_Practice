const express = require("express")
const app = express();

const courses = [
    { id: 1, course: "java" },
    { id: 2, course: "java2" },
    { id: 3, course: "java3" }
]

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})


app.get('/api/courses/handlingquery',(req,res)=>{
   res.send(req.query)// getting query object
})


app.get("/api/courses/:id",(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id))
  if (!course)res.status(404).send("not Found")
   res.send(course)
})



const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server running on ${port} port`))
const express = require("express")
const Joi=require("joi")
const app = express();

app.use(express.json())

const courses = [
    { id: 1, course: "java" },
    { id: 2, course: "java2" },
    { id: 3, course: "java3" }
]

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})


app.get('/api/courses/handlingquery',(req,res)=>{
   res.send(req.query)// getting query object
})


app.get("/api/courses/:id",(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id))
  if (!course)res.status(404).send("not Found")
   res.send(course)
})

app.post('/api/courses',(req,res)=>{
   
    // defining schema which will works on validation
   const schema={
    name:Joi.string().min(3).required()
   } 
  // storing joi validation result
   const result= Joi.validate(req.body,schema)

  if(result.error){
    //400 bad request
    res.status(400).send(result.error.details[0].message)
  }

    const course={
        id:courses.length+1,
        course:req.body.name
    }
    courses.push(course)
    res.send(course)
})


app.put('/api/courses/:id',(req,res)=>{
  // checking valid id
  const course=courses.find(c=>c.id===parseInt(req.params.id))
  if(!course)res.status(404).send("id NOT found")

 // validate input
const schema={
    name:Joi.string().min(3).required()
}
 const result=Joi.validate(req.body,schema)
 if (result.error){
    res.status(400).send(result.error.details[0].message)
 }

  // update
  course.course=req.body.name
  res.send(course)
})

app.delete('/api/courses/:id',(req,res)=>{
    //check valid id
  const course=courses.find(c=>c.id===parseInt(req.params.id))
  if (!course){
    res.status(404).send("Id NOT found")
    return
  }
// deleting 
  const index=courses.indexOf(course)
  courses.splice(index,1)
  res.send(course)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server running on ${port} port`))
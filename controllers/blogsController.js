//import project model

const blogs = require("../models/blogsSchema");

exports.addBlogs = async (req, res) => {
  console.log("inside blogs controller");
  const userid = req.uid;
  console.log(userid);

  const blogimg = req.file.filename;
  console.log(blogimg);

  const { title, headline, subject, content, timestamp } = req.body;
  console.log(
    `${title},${headline},${subject},${content},${timestamp},${blogimg},${userid}`
  );
  try {
    const exblogs = await blogs.findOne({ timestamp });
    if (exblogs) {
      res.status(406).json("Project already exists..Please add new one");
    } else {
      const newblog = new blogs({
        title,
        headline,
        subject,
        content,
        timestamp,
        blogimg,
        userid,
      });
      await newblog.save();
      res.status(200).json(newblog);
    }
  } catch (err) {
    res.status(401).json(`request failed due to ${err}`);
  }
};

//home blogs

exports.getblogshome=async(req,res)=>{
  try {
    const bloghm=await blogs.find().limit(3) 
    res.status(200).json(bloghm)
  } catch (err) {
    res.status(401).json(`Request failed due to ${err}`)
  }
}

//get all blogs

exports.getallblogshome=async(req,res)=>{
  const skey=req.query.search
  console.log(skey);

  const query={
    subject:{
      $regex:skey,$options:'i'
    }
  }
  try {
    const bloghm=await blogs.find(query) 
    res.status(200).json(bloghm)
  } catch (err) {
    res.status(401).json(`Request failed due to ${err}`)
  }
}

//userblogs

exports.getUsrblogs=async(req,res)=>{
  try {
    const userid=req.uid
    const usrblogs=await blogs.find({userid})
    res.status(200).json(usrblogs)
  } catch (error) {
    res.status(401).json(`Request failed due to ${err}`)
  }
}

//edit userblogs

exports.editUserproject=async(req,res)=>{
  const {id}=req.params

  const userid=req.uid
  const {title,headline,subject,content,timestamp,blogimg}=req.body

  const uploadedimg=req.file?req.file.filename:blogimg

  try {
    const updateblogs=await blogs.findByIdAndUpdate({_id:id},{title,headline,subject,content,timestamp,blogimg:uploadedimg,userid}, {new:true})

    await updateblogs.save()
    res.status(200).json(updateblogs)
  } catch (err) {
    res.status(401).json(err)
  }

}


//delete blogs

exports.deleteuserblogs=async(req,res)=>{
  const {id}=req.params

  try {
    const deletblg=await blogs.findByIdAndDelete({_id:id})
    res.status(200).json(deletblg)
  } catch (err) {
    res.status(401).json(err)
  }
}

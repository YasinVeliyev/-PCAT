let form = `<form action="/photos/add_photo" method="post" enctype="multipart/form-data">
<div class="form-group">
    
    <div class="col-sm-7">
        <input type="text" class="form-control" id="name" name="name" aria-describedby="name"
            placeholder="Name">
    </div>
</div>
<div class="form-group">
   
    <div class="col-sm-7">
        <input type="text" class="form-control" id="title" name="title" aria-describedby="title"
            placeholder="Title">
    </div>
</div>
<div class="form-group">
    
    <div class="col-sm-7">
        <input type="text" class="form-control" id="description" name="description" aria-describedby="description"
            placeholder="Description">
    </div>
</div>
<div class="form-group">
    <div class="col-sm-7">
        <input type="file" class="form-control-file" id="src" name="src">
    </div>
    
  </div>


<div class="form-group row m-3">
    <div class="col-sm-2"></div>
    <div class="col-sm-7">
        <button type="submit" class="btn btn-primary col-sm-6 p-1">Add Photo</button>
    </div>

</div>

</form>`;

let deleteform = document.querySelector(".delete_photo");
let deletePhoto = (event) => {
    event.preventDefault();
    fetch(deleteform.action, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then(() => {
            event.path[3].remove();
        })
        .catch(console.error);
};

deleteform.addEventListener("submit", deletePhoto);

const allLikeButton = document.querySelectorAll('.like-button');

async function likeButton(productid, btn){
    
    try{
        const response = await axios({
            method: 'post',
            url: `/product/${productid}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},// for telling that it is a ajax request
          });
        
          if(btn.children[0].classList.contains('fa-solid')){
            btn.children[0].classList.remove('fa-solid');
            btn.children[0].classList.add('fa-regular');
          }
          else{
            btn.children[0].classList.add('fa-solid');
            btn.children[0].classList.remove('fa-regular');
          }
          
        console.log(response);
    }
    catch(e){
        window.location.replace('/login');//changes the current location to specified location//used to redirect the browser using js
        console.log(e.message);
    }
  
}

for(let btn of allLikeButton){

    btn.addEventListener('click', () => {
        const productid = btn.getAttribute('product-id');
        likeButton(productid, btn);
    })
}
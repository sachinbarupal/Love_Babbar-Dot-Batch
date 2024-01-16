const profile_modal = document.querySelector('#profile-modal');
const follow_modal = document.querySelector('#follow-modal');

const share_btn = document.querySelector('#share-btn');
const follow_btn = document.querySelector('#follow-btn');

const profile_modal_close = document.querySelector('#profile-modal-close');
const follow_modal_close = document.querySelector('#follow-modal-close');

const overlay = document.querySelector('#overlay');


const openModal = (event) => {
    const elemId = event.target.id;
    
    if(elemId == 'share-btn'){
        profile_modal.classList.add('modal-active');
        overlay.classList.add('overlay-active');
        console.log('Profile Modal Open');
    }
    
    else{
        follow_modal.classList.add('modal-active');
        overlay.classList.add('overlay-active');
        console.log('Follow Modal Open');
        
    }
};

const closeModal = (event) => {

    const elemId = event.target.id;

    if(elemId == 'profile-modal-close'){
        profile_modal.classList.remove('modal-active');
        overlay.classList.remove('overlay-active');
        console.log('Profile Modal Close');
    }
    
    else if(elemId == 'follow-modal-close'){
        profile_modal.classList.remove('modal-active');
        follow_modal.classList.remove('modal-active');
        overlay.classList.remove('overlay-active');
        console.log('Follow Modal Close');
    }

    else{
        profile_modal.classList.remove('modal-active');
        follow_modal.classList.remove('modal-active');
        overlay.classList.remove('overlay-active');
        console.log('Modal Close');
    }
};

share_btn.addEventListener('click', openModal);
follow_btn.addEventListener('click', openModal);

profile_modal_close.addEventListener('click', closeModal);
follow_modal_close.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);
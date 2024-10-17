!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error"},t=(e,t,r)=>{const n=e.querySelector(`#${t.id}-error`);t.classList.remove(r.inputErrorClass),n.textContent=""},r=(e,t,r)=>{(e=>e.some((e=>!e.validity.valid)))(e)?n(t,r):(t.classList.remove(r.inactiveButtonClass),t.disabled=!1)},n=(e,t)=>{e.classList.add(t.inactiveButtonClass),e.disabled=!0},o="card__like-btn_liked",a="modal_opened",s="Saving...",i="Save",l=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}_checkResponse(e){return e.ok?e.json():Promise.reject(`Error sending fetch request: ${e.status}`)}_request(e,t){return fetch(e,t).then(this._checkResponse)}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}getUserInfo(){return this._request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this._request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editUserAvatar(e){let{avatar:t}=e;return this._request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})})}getInitialCards(){return this._request(`${this._baseUrl}/cards`,{headers:this._headers})}addCard(e){let{name:t,link:r}=e;return this._request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){let{id:t}=e;return this._request(`${this._baseUrl}/cards/${t}`,{method:"DELETE",headers:this._headers})}changeCardLikeStatus(e){let{id:t,isLiked:r}=e;const n=r?"DELETE":"PUT";return this._request(`${this._baseUrl}/cards/${t}/likes`,{method:n,headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"f7822124-59b5-42fe-a8b8-2f48bd0b923b","Content-Type":"application/json"}}),c=document.querySelector(".profile__edit-btn"),d=document.querySelector(".profile__add-btn"),u=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__avatar"),h=document.querySelector(".profile__avatar-btn"),v=document.querySelector("#edit-profile-modal"),f=document.forms["edit-profile-form"],p=f.querySelector(".modal__submit-btn"),y=v.querySelector(".modal__input#name-input"),S=v.querySelector(".modal__input#description-input"),b=document.querySelector("#edit-profile-avatar-modal"),q=document.forms["edit-profile-avatar-form"],C=q.querySelector(".modal__submit-btn"),L=b.querySelector(".modal__input#avatar-link-input"),k=document.querySelector("#new-post-modal"),E=document.forms["new-post-form"],g=E.querySelector(".modal__submit-btn"),x=k.querySelector(".modal__input#image-link-input"),U=k.querySelector(".modal__input#caption-input"),$=document.querySelector("#delete-modal"),A=$.querySelector(".modal__delete-btn"),D=$.querySelector(".modal__cancel-btn"),T=document.querySelector("#preview-modal"),I=T.querySelector(".modal__image"),w=T.querySelector(".modal__caption"),P=document.querySelectorAll(".modal__close-btn"),B=document.querySelector("#card"),N=document.querySelector(".cards__list");let O,j;function J(e){e.classList.add(a),e.focus(),e.addEventListener("click",z),e.addEventListener("keydown",M)}function H(e){e.classList.remove(a),e.removeEventListener("click",z),e.removeEventListener("keydown",M)}function R(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=B.content.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),a=t.querySelector(".card__like-btn"),s=t.querySelector(".card__delete-btn");return n.src=e.link,n.alt=e.name,r.textContent=e.name,e.isLiked&&a.classList.toggle(o),a.addEventListener("click",(t=>function(e,t){l.changeCardLikeStatus({id:t._id,isLiked:t.isLiked}).then((()=>{e.target.classList.toggle(o)})).catch(console.error)}(t,e))),s.addEventListener("click",(()=>{!function(e,t){O=e,j=t._id,J($)}(t,e)})),n.addEventListener("click",(()=>{I.src=e.link,w.textContent=e.name,I.alt=e.name,J(T)})),t}(e);N[t](r)}function z(e){e.target.classList.contains(a)&&H(e.target)}function M(e){"Escape"===e.key&&H(e.currentTarget)}var F;c.addEventListener("click",(()=>{var r,n;y.value=u.textContent,S.value=m.textContent,r=f,n=e,[y,S].forEach((e=>t(r,e,n))),J(v)})),f.addEventListener("submit",(function(t){t.preventDefault(),p.textContent=s,l.editUserInfo({name:y.value,about:S.value}).then((t=>{u.textContent=t.name,m.textContent=t.about,n(p,e),H(v)})).catch(console.error).finally((()=>{p.textContent=i}))})),h.addEventListener("click",(()=>{J(b)})),q.addEventListener("submit",(function(e){e.preventDefault(),C.textContent=s,console.log("tesT"),l.editUserAvatar({avatar:L.value}).then((t=>{_.src=t.avatar,e.target.reset(),H(b)})).catch(console.error).finally((()=>{C.textContent=i})),console.log()})),d.addEventListener("click",(()=>{J(k)})),E.addEventListener("submit",(function(e){e.preventDefault(),g.textContent=s,l.addCard({name:U.value,link:x.value}).then((t=>{R(t),e.target.reset(),H(k)})).catch(console.error).finally((()=>{g.textContent=i}))})),A.addEventListener("click",(function(e){e.preventDefault(),A.textContent="Deleting...",l.deleteCard({id:j}).then((()=>{O.remove(),H($)})).catch(console.error).finally((()=>{A.textContent="Delete"}))})),D.addEventListener("click",(function(e){e.preventDefault(),H($)})),P.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>H(t)))})),l.getAppInfo().then((e=>{let[t,r]=e;t.forEach((e=>{R(e,"append")})),u.textContent=r.name,m.textContent=r.about,_.src=r.avatar})).catch(console.error),F=e,document.querySelectorAll(F.formSelector).forEach((e=>((e,o)=>{const a=Array.from(e.querySelectorAll(o.inputSelector)),s=e.querySelector(o.submitButtonSelector);r(a,s,o),e.addEventListener("reset",(()=>{n(s,o)})),a.forEach((n=>{n.addEventListener("input",(()=>{((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,n,o),r(a,s,o)}))}))})(e,F)))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixFQUFPSixpQkFDbENLLEVBQWFLLFlBQWNvSixDQUFZLEVBV3JDRCxDQUNFM0osRUFDQUMsRUFDQUEsRUFBYTRKLGtCQUNiM0osRUFJSixFQXlDSXdKLENBQW1CMUosRUFBYUMsRUFBY0MsR0FDOUNPLEVBQWtCQyxFQUFXQyxFQUFlVCxFQUFPLEdBQ25ELEdBQ0YsRUFNZ0NxSixDQUFrQnZKLEVBQWFFLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvQXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG59O1xuXG5jb25zdCBzaG93SW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UsIGNvbmZpZykgPT4ge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xuICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG59O1xuXG5jb25zdCBoaWRlSW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbn07XG5cbmNvbnN0IGNoZWNrSW5wdXRWYWxpZGl0eSA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICBzaG93SW5wdXRFcnJvcihcbiAgICAgIGZvcm1FbGVtZW50LFxuICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlLFxuICAgICAgY29uZmlnXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICB9XG59O1xuXG5jb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXQsIGNvbmZpZykpO1xufTtcblxuY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50LCBjb25maWcpO1xuICB9IGVsc2Uge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IChidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG5jb25zdCBzZXRFdmVudExpc3RlbmVycyA9IChmb3JtRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgKTtcbiAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcblxuICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG5cbiAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2V0XCIsICgpID0+IHtcbiAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gIH0pO1xuXG4gIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBmb3JtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3Rvcik7XG5cbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsZW1lbnQpID0+IHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbGVtZW50LCBjb25maWcpKTtcbn07XG4iLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MgYXMgdmFsaWRhdGlvbkNvbmZpZyxcbiAgcmVzZXRWYWxpZGF0aW9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcblxuY29uc3QgY2FyZExpa2VkQ1NTQ2xhc3MgPSBcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCI7XG5jb25zdCBtb2RhbExpa2VkQ1NTQ2xhc3MgPSBcIm1vZGFsX29wZW5lZFwiO1xuY29uc3Qgc2F2aW5nU2F2ZUJ1dHRvblRleHQgPSBcIlNhdmluZy4uLlwiO1xuY29uc3QgZGVmYXVsdFNhdmVCdXR0b25UZXh0ID0gXCJTYXZlXCI7XG5jb25zdCBkZWxldGluZ0RlbGV0ZUJ1dHRvblRleHQgPSBcIkRlbGV0aW5nLi4uXCI7XG5jb25zdCBkZWZhdWx0RGVsZXRlQnV0dG9uVGV4dCA9IFwiRGVsZXRlXCI7XG5cbi8vIEFwaSBoYW5kbGVzIGFsbCBmZXRjaCByZXF1ZXN0cyB0byB0aGUgc2VydmVyXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJmNzgyMjEyNC01OWI1LTQyZmUtYThiOC0yZjQ4YmQwYjkyM2JcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBQcm9maWxlIGVsZW1lbnRzXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XG5jb25zdCBuZXdQb3N0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnRuXCIpO1xuY29uc3QgcHJvZmlsZU5hbWVMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvblBhcmFncmFwaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCJcbik7XG5jb25zdCBwcm9maWxlQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5jb25zdCBlZGl0UHJvZmlsZUF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyLWJ0blwiKTtcblxuLy9FZGl0IFByb2ZpbGUgTW9kYWwgJiBFbGVtZW50c1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLW1vZGFsXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1mb3JtXCJdO1xuY29uc3QgZWRpdFByb2ZpbGVTdWJtaXRCdXR0b24gPVxuICBlZGl0UHJvZmlsZU1vZGFsRm9ybS5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbE5hbWVJbnB1dCA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcbiAgXCIubW9kYWxfX2lucHV0I25hbWUtaW5wdXRcIlxuKTtcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWxEZXNjcmlwdGlvbklucHV0ID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIi5tb2RhbF9faW5wdXQjZGVzY3JpcHRpb24taW5wdXRcIlxuKTtcblxuLy9FZGl0ZSBQcm9maWxlIEF2YXRhciBNb2RhbCAmIEVsZW1lbnRzXG5jb25zdCBlZGl0UHJvZmlsZUF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIjZWRpdC1wcm9maWxlLWF2YXRhci1tb2RhbFwiXG4pO1xuY29uc3QgZWRpdFByb2ZpbGVBdmF0YXJNb2RhbEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1hdmF0YXItZm9ybVwiXTtcbmNvbnN0IGVkaXRQcm9maWxlQXZhdGFyU3VibWl0QnV0dG9uID1cbiAgZWRpdFByb2ZpbGVBdmF0YXJNb2RhbEZvcm0ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcbmNvbnN0IGVkaXRQcm9maWxlQXZhdGFyTW9kYWxJbWFnZUlucHV0ID0gZWRpdFByb2ZpbGVBdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIi5tb2RhbF9faW5wdXQjYXZhdGFyLWxpbmstaW5wdXRcIlxuKTtcblxuLy9OZXcgUG9zdCBNb2RhbCAmIEVsZW1lbnRzXG5jb25zdCBuZXdQb3N0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wb3N0LW1vZGFsXCIpO1xuY29uc3QgbmV3UG9zdE1vZGFsRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wibmV3LXBvc3QtZm9ybVwiXTtcbmNvbnN0IG5ld1Bvc3RTdWJtaXRCdXR0b24gPVxuICBuZXdQb3N0TW9kYWxGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5jb25zdCBuZXdQb3N0TW9kYWxJbWFnZUxpbmtJbnB1dCA9IG5ld1Bvc3RNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIi5tb2RhbF9faW5wdXQjaW1hZ2UtbGluay1pbnB1dFwiXG4pO1xuY29uc3QgbmV3UG9zdE1vZGFsQ2FwdGlvbklucHV0ID0gbmV3UG9zdE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLm1vZGFsX19pbnB1dCNjYXB0aW9uLWlucHV0XCJcbik7XG5cbi8vRGVsZXRlIGNhcmQgTW9kYWwgJiBFbGVtZW50c1xuY29uc3QgZGVsZXRlQ2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtbW9kYWxcIik7XG5jb25zdCBkZWxldGVDYXJkQ29uZmlybUJ1dHRvbiA9XG4gIGRlbGV0ZUNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19kZWxldGUtYnRuXCIpO1xuY29uc3QgZGVsZXRlQ2FyZENhbmNlbEJ1dHRvbiA9XG4gIGRlbGV0ZUNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYW5jZWwtYnRuXCIpO1xuXG4vL0ltYWdlIE1vZGFsICYgRWxlbWVudHNcbmNvbnN0IGltYWdlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XG5jb25zdCBpbWFnZU1vZGFsSW1hZ2UgPSBpbWFnZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuY29uc3QgaW1hZ2VNb2RhbENhcHRpb24gPSBpbWFnZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG5cbi8vQWxsIGNsb3NlIG1vZGFsIGJ1dHRvbnNcbmNvbnN0IGNsb3NlTW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuXG4vL0NhcmQgdGVtcGxhdGVcbmNvbnN0IGNhcmRUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZFwiKTtcblxuLy9DYXJkcyBjb250YWluZXJcbmNvbnN0IGNhcmRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XG5cbi8vVXNlZCBmb3IgZGVsZXRpbmcgY2FyZHMgaW4gaGFuZGxlQ2FyZERlbGV0ZSBmdW5jdGlvbnNcbmxldCBzZWxlY3RlZENhcmQsIHNlbGVjdGVkQ2FyZElkO1xuXG4vL1ByZWRlZmluZWQgZnVuY3Rpb25zXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudChkYXRhKSB7XG4gIC8vQ3JlYXRlIGEgbmV3IGNhcmQgYnkgY2xvbmluZyB0aGUgdGVtcGxhdGUgY2FyZFxuICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5jb250ZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgLy9HZXQgdGhlIG5ldyBjYXJkcyBlbGVtZW50c1xuICBjb25zdCBjYXJkVGl0bGUgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuICBjb25zdCBjYXJkSW1hZ2UgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idG5cIik7XG4gIGNvbnN0IGNhcmREZWxldGVCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XG5cbiAgLy9TZXQgdGhlIG5ldyBjYXJkcyBlbGVtZW50cyBmcm9tIHRoZSBkYXRhIHBhc3NlZCBpbnRvIHRoZSBmdW5jdGlvblxuICBjYXJkSW1hZ2Uuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2UuYWx0ID0gZGF0YS5uYW1lO1xuICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGlmIChkYXRhLmlzTGlrZWQpIHtcbiAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKGNhcmRMaWtlZENTU0NsYXNzKTtcbiAgfVxuXG4gIC8vTWFrZSB0aGUgbGlrZSBidXR0b24gc3RhdGUgY2hhbmdlIHdoZW4gY2xpY2tlZFxuICBjYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT5cbiAgICBoYW5kbGVUb2dnbGVMaWtlQ2FyZChldnQsIGRhdGEpXG4gICk7XG5cbiAgLy9EZWxldGUgY2FyZCB3aGVuIGRlbGV0ZSBidXR0b24gY2xpY2tlZFxuICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YSk7XG4gIH0pO1xuXG4gIGNhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGltYWdlTW9kYWxJbWFnZS5zcmMgPSBkYXRhLmxpbms7XG4gICAgaW1hZ2VNb2RhbENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgaW1hZ2VNb2RhbEltYWdlLmFsdCA9IGRhdGEubmFtZTtcbiAgICBvcGVuTW9kYWwoaW1hZ2VNb2RhbCk7XG4gIH0pO1xuXG4gIHJldHVybiBjYXJkRWxlbWVudDtcbn1cblxuLy9VdGlsaXR5IGZ1bmN0aW9uc1xuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQobW9kYWxMaWtlZENTU0NsYXNzKTtcblxuICBtb2RhbC5mb2N1cygpO1xuXG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbE91dHNpZGVDbGljayk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZU1vZGFsRXNjYXBlS2V5KTtcbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKG1vZGFsTGlrZWRDU1NDbGFzcyk7XG5cbiAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsT3V0c2lkZUNsaWNrKTtcbiAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlTW9kYWxFc2NhcGVLZXkpO1xufVxuXG5mdW5jdGlvbiBhZGRDYXJkVG9DYXJkTGlzdChjYXJkLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGNhcmQpO1xuICBjYXJkc0xpc3RbbWV0aG9kXShjYXJkRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vZGFsT3V0c2lkZUNsaWNrKGV2dCkge1xuICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobW9kYWxMaWtlZENTU0NsYXNzKSkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LnRhcmdldCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW9kYWxFc2NhcGVLZXkoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY2xvc2VNb2RhbChldnQuY3VycmVudFRhcmdldCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlVG9nZ2xlTGlrZUNhcmQoZXZ0LCBkYXRhKSB7XG4gIGFwaVxuICAgIC5jaGFuZ2VDYXJkTGlrZVN0YXR1cyh7IGlkOiBkYXRhLl9pZCwgaXNMaWtlZDogZGF0YS5pc0xpa2VkIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKGNhcmRMaWtlZENTU0NsYXNzKTtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YSkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBkYXRhLl9pZDtcblxuICBvcGVuTW9kYWwoZGVsZXRlQ2FyZE1vZGFsKTtcbn1cblxuLy9Gb3JtIHN1Ym1pdCBoYW5kbGVyc1xuZnVuY3Rpb24gaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGVkaXRQcm9maWxlU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gc2F2aW5nU2F2ZUJ1dHRvblRleHQ7XG5cbiAgYXBpXG4gICAgLmVkaXRVc2VySW5mbyh7XG4gICAgICBuYW1lOiBlZGl0UHJvZmlsZU1vZGFsTmFtZUlucHV0LnZhbHVlLFxuICAgICAgYWJvdXQ6IGVkaXRQcm9maWxlTW9kYWxEZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVOYW1lTGFiZWwudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgICBwcm9maWxlRGVzY3JpcHRpb25QYXJhZ3JhcGgudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuXG4gICAgICBkaXNhYmxlQnV0dG9uKGVkaXRQcm9maWxlU3VibWl0QnV0dG9uLCB2YWxpZGF0aW9uQ29uZmlnKTtcblxuICAgICAgY2xvc2VNb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIGVkaXRQcm9maWxlU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gZGVmYXVsdFNhdmVCdXR0b25UZXh0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFZGl0UHJvZmlsZUF2YXRhclN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgZWRpdFByb2ZpbGVBdmF0YXJTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBzYXZpbmdTYXZlQnV0dG9uVGV4dDtcbiAgY29uc29sZS5sb2coXCJ0ZXNUXCIpO1xuXG4gIGFwaVxuICAgIC5lZGl0VXNlckF2YXRhcih7IGF2YXRhcjogZWRpdFByb2ZpbGVBdmF0YXJNb2RhbEltYWdlSW5wdXQudmFsdWUgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcHJvZmlsZUF2YXRhci5zcmMgPSBkYXRhLmF2YXRhcjtcblxuICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuXG4gICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlQXZhdGFyTW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgZWRpdFByb2ZpbGVBdmF0YXJTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBkZWZhdWx0U2F2ZUJ1dHRvblRleHQ7XG4gICAgfSk7XG5cbiAgY29uc29sZS5sb2coKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTmV3UG9zdFN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbmV3UG9zdFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHNhdmluZ1NhdmVCdXR0b25UZXh0O1xuXG4gIGFwaVxuICAgIC5hZGRDYXJkKHtcbiAgICAgIG5hbWU6IG5ld1Bvc3RNb2RhbENhcHRpb25JbnB1dC52YWx1ZSxcbiAgICAgIGxpbms6IG5ld1Bvc3RNb2RhbEltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGFkZENhcmRUb0NhcmRMaXN0KGRhdGEpO1xuXG4gICAgICBldnQudGFyZ2V0LnJlc2V0KCk7XG5cbiAgICAgIGNsb3NlTW9kYWwobmV3UG9zdE1vZGFsKTtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIG5ld1Bvc3RTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBkZWZhdWx0U2F2ZUJ1dHRvblRleHQ7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGRlbGV0ZUNhcmRDb25maXJtQnV0dG9uLnRleHRDb250ZW50ID0gZGVsZXRpbmdEZWxldGVCdXR0b25UZXh0O1xuXG4gIGFwaVxuICAgIC5kZWxldGVDYXJkKHsgaWQ6IHNlbGVjdGVkQ2FyZElkIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpO1xuXG4gICAgICBjbG9zZU1vZGFsKGRlbGV0ZUNhcmRNb2RhbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBkZWxldGVDYXJkQ29uZmlybUJ1dHRvbi50ZXh0Q29udGVudCA9IGRlZmF1bHREZWxldGVCdXR0b25UZXh0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkQ2FuY2VsKGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjbG9zZU1vZGFsKGRlbGV0ZUNhcmRNb2RhbCk7XG59XG5cbi8vRXZlbnQgbGlzdGVuZXJzXG4vL0VkaXQgUHJvZmlsZSBNb2RhbCBldmVudCBsaXN0ZW5lcnNcbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXRQcm9maWxlTW9kYWxOYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZUxhYmVsLnRleHRDb250ZW50O1xuICBlZGl0UHJvZmlsZU1vZGFsRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9XG4gICAgcHJvZmlsZURlc2NyaXB0aW9uUGFyYWdyYXBoLnRleHRDb250ZW50O1xuXG4gIHJlc2V0VmFsaWRhdGlvbihcbiAgICBlZGl0UHJvZmlsZU1vZGFsRm9ybSxcbiAgICBbZWRpdFByb2ZpbGVNb2RhbE5hbWVJbnB1dCwgZWRpdFByb2ZpbGVNb2RhbERlc2NyaXB0aW9uSW5wdXRdLFxuICAgIHZhbGlkYXRpb25Db25maWdcbiAgKTtcblxuICBvcGVuTW9kYWwoZWRpdFByb2ZpbGVNb2RhbCk7XG59KTtcbmVkaXRQcm9maWxlTW9kYWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQpO1xuXG4vLyBFZGl0IFByb2ZpbGUgQXZhdGFyIGV2ZW50IGxpc3RlbmVyc1xuZWRpdFByb2ZpbGVBdmF0YXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGVkaXRQcm9maWxlQXZhdGFyTW9kYWwpO1xufSk7XG5lZGl0UHJvZmlsZUF2YXRhck1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFxuICBcInN1Ym1pdFwiLFxuICBoYW5kbGVFZGl0UHJvZmlsZUF2YXRhclN1Ym1pdFxuKTtcblxuLy8gTmV3IFBvc3QgTW9kYWwgZXZlbnQgbGlzdGVuZXJzXG5uZXdQb3N0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG9wZW5Nb2RhbChuZXdQb3N0TW9kYWwpO1xufSk7XG5uZXdQb3N0TW9kYWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlTmV3UG9zdFN1Ym1pdCk7XG5cbi8vIERlbGV0ZSBDYXJkIE1vZGFsIGV2ZW50IGxpc3RlbmVyc1xuZGVsZXRlQ2FyZENvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuZGVsZXRlQ2FyZENhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRGVsZXRlQ2FyZENhbmNlbCk7XG5cbi8vQ2xvc2UgZXZlbnQgbGlzdGVuZXIgZm9yIGVhY2ggY2xvc2UgbW9kYWwgYnV0dG9uXG5jbG9zZU1vZGFsQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgLy9GaW5kIHRoZSBwYXJlbnQgbW9kYWxcbiAgY29uc3QgbW9kYWwgPSBidXR0b24uY2xvc2VzdChcIi5tb2RhbFwiKTtcblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwobW9kYWwpKTtcbn0pO1xuXG4vL3BlcmZvcm1zIGFsbCBuZXR3b3JrIGZldGNocyBhbmQgaGFuZGxlcyB0aGUgcmVzcG9uc2VzXG4vL2dldEFwcEluZm8gcmV0dXJucyBQcm9taXNlLmFsbC5cbmFwaVxuICAuZ2V0QXBwSW5mbygpXG4gIC50aGVuKChbY2FyZHMsIHVzZXJJbmZvXSkgPT4ge1xuICAgIC8vZ2VuZXJhdGVzIGFsbCBvZiB0aGUgY2FyZHMgaW50byBwaWN0dXJlIGNhcmRzIGFuZCBkaXNwbGF5cyB0aGVtIG9uIHRoZSBwYWdlXG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgYWRkQ2FyZFRvQ2FyZExpc3QoY2FyZCwgXCJhcHBlbmRcIik7XG4gICAgfSk7XG4gICAgLy9jaGFuZ2UgdGhlIHVzZXIgaW5mb3JtYXRpb24gYmFzZWQgb24gdGhlIGRhdGEgcmV0cmlldmVkIGZyb20gdGhlIHNlcnZlclxuICAgIHByb2ZpbGVOYW1lTGFiZWwudGV4dENvbnRlbnQgPSB1c2VySW5mby5uYW1lO1xuICAgIHByb2ZpbGVEZXNjcmlwdGlvblBhcmFncmFwaC50ZXh0Q29udGVudCA9IHVzZXJJbmZvLmFib3V0O1xuICAgIHByb2ZpbGVBdmF0YXIuc3JjID0gdXNlckluZm8uYXZhdGFyO1xuICB9KVxuICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG5cbi8vZW5hYmxlcyB2YWxpZGF0aW9uIG9uIHRoZSBmb3JtXG5lbmFibGVWYWxpZGF0aW9uKHZhbGlkYXRpb25Db25maWcpO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIF9jaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3Igc2VuZGluZyBmZXRjaCByZXF1ZXN0OiAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cblxuICBfcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0VXNlckluZm8oKV0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdFVzZXJBdmF0YXIoeyBhdmF0YXIgfSkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxpbmssXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoeyBpZCB9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlQ2FyZExpa2VTdGF0dXMoeyBpZCwgaXNMaWtlZCB9KSB7XG4gICAgY29uc3QgZmV0Y2hNZXRob2QgPSBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCI7XG5cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogZmV0Y2hNZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcbiJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiY29uZmlnIiwiZXJyb3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImlkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidGV4dENvbnRlbnQiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0TGlzdCIsImJ1dHRvbkVsZW1lbnQiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsImRpc2FibGVCdXR0b24iLCJkaXNhYmxlZCIsImFkZCIsImNhcmRMaWtlZENTU0NsYXNzIiwibW9kYWxMaWtlZENTU0NsYXNzIiwic2F2aW5nU2F2ZUJ1dHRvblRleHQiLCJkZWZhdWx0U2F2ZUJ1dHRvblRleHQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiX2NoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiX3JlcXVlc3QiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJ0aGVuIiwiZ2V0QXBwSW5mbyIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiZWRpdFVzZXJJbmZvIiwiX3JlZjIiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRVc2VyQXZhdGFyIiwiX3JlZjMiLCJhdmF0YXIiLCJhZGRDYXJkIiwiX3JlZjQiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsIl9yZWY1IiwiY2hhbmdlQ2FyZExpa2VTdGF0dXMiLCJfcmVmNiIsImlzTGlrZWQiLCJmZXRjaE1ldGhvZCIsImF1dGhvcml6YXRpb24iLCJlZGl0UHJvZmlsZUJ1dHRvbiIsImRvY3VtZW50IiwibmV3UG9zdEJ1dHRvbiIsInByb2ZpbGVOYW1lTGFiZWwiLCJwcm9maWxlRGVzY3JpcHRpb25QYXJhZ3JhcGgiLCJwcm9maWxlQXZhdGFyIiwiZWRpdFByb2ZpbGVBdmF0YXJCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVNb2RhbEZvcm0iLCJmb3JtcyIsImVkaXRQcm9maWxlU3VibWl0QnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbE5hbWVJbnB1dCIsImVkaXRQcm9maWxlTW9kYWxEZXNjcmlwdGlvbklucHV0IiwiZWRpdFByb2ZpbGVBdmF0YXJNb2RhbCIsImVkaXRQcm9maWxlQXZhdGFyTW9kYWxGb3JtIiwiZWRpdFByb2ZpbGVBdmF0YXJTdWJtaXRCdXR0b24iLCJlZGl0UHJvZmlsZUF2YXRhck1vZGFsSW1hZ2VJbnB1dCIsIm5ld1Bvc3RNb2RhbCIsIm5ld1Bvc3RNb2RhbEZvcm0iLCJuZXdQb3N0U3VibWl0QnV0dG9uIiwibmV3UG9zdE1vZGFsSW1hZ2VMaW5rSW5wdXQiLCJuZXdQb3N0TW9kYWxDYXB0aW9uSW5wdXQiLCJkZWxldGVDYXJkTW9kYWwiLCJkZWxldGVDYXJkQ29uZmlybUJ1dHRvbiIsImRlbGV0ZUNhcmRDYW5jZWxCdXR0b24iLCJpbWFnZU1vZGFsIiwiaW1hZ2VNb2RhbEltYWdlIiwiaW1hZ2VNb2RhbENhcHRpb24iLCJjbG9zZU1vZGFsQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjYXJkVGVtcGxhdGUiLCJjYXJkc0xpc3QiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiZm9jdXMiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxPdXRzaWRlQ2xpY2siLCJoYW5kbGVNb2RhbEVzY2FwZUtleSIsImNsb3NlTW9kYWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ2FyZFRvQ2FyZExpc3QiLCJjYXJkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY2FyZEVsZW1lbnQiLCJkYXRhIiwiY29udGVudCIsImNsb25lTm9kZSIsImNhcmRUaXRsZSIsImNhcmRJbWFnZSIsImNhcmRMaWtlQnV0dG9uIiwiY2FyZERlbGV0ZUJ1dHRvbiIsInNyYyIsImFsdCIsInRvZ2dsZSIsImV2dCIsIl9pZCIsInRhcmdldCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiaGFuZGxlVG9nZ2xlTGlrZUNhcmQiLCJoYW5kbGVEZWxldGVDYXJkIiwiZ2V0Q2FyZEVsZW1lbnQiLCJjb250YWlucyIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJyZXNldFZhbGlkYXRpb24iLCJ2YWx1ZSIsInZhbGlkYXRpb25Db25maWciLCJmb3JFYWNoIiwiaW5wdXQiLCJwcmV2ZW50RGVmYXVsdCIsImZpbmFsbHkiLCJsb2ciLCJyZXNldCIsImJ1dHRvbiIsImNsb3Nlc3QiLCJjYXJkcyIsInVzZXJJbmZvIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJBcnJheSIsImZyb20iLCJjaGVja0lucHV0VmFsaWRpdHkiLCJzaG93SW5wdXRFcnJvciIsImVycm9yTWVzc2FnZSIsInZhbGlkYXRpb25NZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==
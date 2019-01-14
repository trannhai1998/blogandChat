function Post(){
	function bindEvent(){
		$(".post_edit").click((e)=>{
			var params = {
				id : $(".id").val(),
				title : $(".title").val(),
				content : tinymce.get("content").getContent(),
				author : $(".author").val()
			}	
			var base_url = location.protocol + "//" + document.domain + ":" + location.port;
			$.ajax({
				url : base_url + "/admin/post/edit",
				type : "PUT",
				data : params,
				dataType : "json",
				success : (res) => {
					if (res && res.status_code == 200){
						location.reload();
					}
				}
			})
		});
		$('.post_delete').click((e)=>{
			var post_id = $('.post_delete').attr('post_id');
			var base_url = location.protocol + "//" + document.domain + ":" + location.port;
			$.ajax({
				url : base_url + "/admin/post/delete",
				type : "DELETE",
				data : {id:post_id},
				dataType : "json",
				success : (res) => {
					if (res && res.status_code == 200){
						location.reload();
					}
				}	
			})
		})
	}

	bindEvent();
}
$(document).ready(() => {
	new Post();
})
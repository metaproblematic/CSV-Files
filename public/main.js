mainVm = new Vue({
	el: '#app',
	data: {
		files: '',
		newFile: '',
		recordComplete: false,

	},
	mounted: function() {
		$.get('/files', (dataFromServer) => {
			this.files = dataFromServer
		})
	},
	methods: {
		addFile: function(event) {
			event.preventDefault()
			console.log(this.newFile)
			$.post('/newFile', {newFileKey: this.newFile}, (dataFromServer) => {
				console.log(dataFromServer)
				this.files = dataFromServer
			})

		},
		
	},

})
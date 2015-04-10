module.exports = function(){
	var self = this;

	function UserPrompt(title, message, fadeOut, addClass, transClass, options){
		this.title = title || null,
		this.message = message || null,
		this.fadeOut = fadeOut || null,
		this.addClass = addClass || null,
		this.transClass = transClass || null, 
		this.options = options || null;
		
		self.buildPrompt(this)



	}

	UserPrompt.prototype.prompt = function(){
		document.body.appendChild(this.promptElement);
	}

	UserPrompt.prototype.remove = function(){
		this.promptElement.parentNode.removeChild(this.promptElement);
	}

	
	self.buildPrompt = function(inst){
		var container = document.createElement('div');
			container.className += 'UP-prompt-container';

		var title = document.createElement('div');
			title.className += 'UP-prompt-title';

		var msg = document.createElement('div');
			msg.className += 'UP-prompt-msg';

		var buttons = document.createElement('div');
			buttons.className += 'UP-prompt-buttons';
		
		if(inst.title!==null)
			title.innerHTML = inst.title;
			container.appendChild(title);

		if(inst.msg!==null)
			msg.innerHTML = inst.message;
			container.appendChild(msg);
		
		if(inst.msg!==null)
			container.appendChild(buttons);


		if(inst.options!==null && inst.options.length>0){
			var additionalButtonClass = 'single';
			if(inst.options.length==2){
				//full width
				additionalButtonClass = 'double';
			}
			buttons.className += ' ' + additionalButtonClass;
			angular.forEach(inst.options, function(value, key) {
				var tmp = document.createElement('div');
					tmp.className += 'UP-prompt-button-opt';
					tmp.className += ' ' + value.addClass;
					tmp.innerHTML = value.msg
					tmp.addEventListener('click', function(){
						inst.remove();
						value.callback();	
					})
					tmp.addEventListener('touch', function(){
						inst.remove();
						value.callback();	
					})
					buttons.appendChild(tmp);
			});
		}




		var span = document.createElement('span');
			span.className += 'UP-prompt-superparent';
		if(inst.addClass!==null)
			span.className += ' ' + inst.addClass;

		if(inst.fadeOut){
			var fadeOut = document.createElement('div');
				fadeOut.className += 'UP-prompt-fadeOut';
				span.appendChild(fadeOut);
		}
		
		var outout = document.createElement('div');
			outout.className += 'UP-prompt-container-outer';
		var inout = document.createElement('div');
			inout.className += 'UP-prompt-container-inner';

		outout.appendChild(inout);
		inout.appendChild(container);

		span.appendChild(outout);
		inst.promptElement = span;
		
	}


	return UserPrompt;
}

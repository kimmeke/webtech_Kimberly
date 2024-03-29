/* ---------------------------------------- FRAMEWORK ---------------------------------- */
var WrapperElement = function(element)
{
    // a wrapper element allow us to extend html dom functionality
    // without changing the behaviour of built-in elements
	
    // this contains the actual selection
    this.element = element;									
    
    // this allows us to see if a selection contains one or more elements
    if(element.length > 1)
    {
        this.isArray = true;
    }
    else
    {
        this.isArray = false;
    }
}

WrapperElement.prototype.toggleClass = function(className)
{
    if(this.isArray)
	{
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].classList.toggle(className);
		}
	}
	else
	{
		this.element.classList.toggle(className);
	}
	return this;
}

WrapperElement.prototype.addClass = function(className)
{
	if(this.isArray)
	{
        // multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].addClass(className);
		}
	}
	else
	{
        // just one element, so we can manipulate it without looping
		this.element.addClass(className);
	}
    // return the original WrapperElement, so that we can chain multiple functions like $("li").addClass("test").toggleClass("something");
	return this;
}

WrapperElement.prototype.prepend = function(item)
{
    if(this.isArray){
        for(var i = 0; i<this.element.length; i++){
            this.element[i].appendChild(item);
        }
    }
    
    else{
        this.element[0].appendChild(item);
    }
    
    return this;
}

WrapperElement.prototype.keyup = function(action){
	if(this.isArray)
	{
		// multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].addEventListener('keyup', action);
		}
	}
	else
	{
		// just one element, let's go nuts
		this.element[0].addEventListener('keyup', action);
	}
	return this;
}

WrapperElement.prototype.click = function(action, callback)
{
    if(this.isArray)
	{
		// multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].addEventListener(action, callback);
		}
	}
	else
	{
		// just one element, let's go nuts
		this.element.addEventListener(action, callback);
	}
	return this;
}

WrapperElement.prototype.val = function(value)
{
	if(this.isArray){
        for(var i = 0; i<this.element.length; i++){
            this.element[i].valueOf(value);
        }
    }
    
    else{
        this.element.valueOf(value);
    }
    
    return this.element.value;
}

var $ = function(selector)
{
	// check if selector is an object already e.g. by passing 'this' on clicks
	if(typeof(selector) == "object")
	{
		return new WrapperElement(selector);
	}

    var selectedItems = document.querySelectorAll(selector);
	var newElement = new WrapperElement(selectedItems);
	return newElement;
}
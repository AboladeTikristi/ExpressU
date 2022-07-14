import React from 'react'
import pic from "../images/expressU.png"
function Footer() {
  return (
    <>
   
        	<div style={{backgroundColor:"black",height:"120px",position:"relative",bottom:"0px"}} class="text-white">
		        <div class="container">
		        	<div class="row">
		        		<div class="col-md-4 col-lg-4 footer-about wow fadeInUp animated"style={{visibility: "visible",animationName:"fadeInUp"}}>
		        			<img class="logo-footer rounded-circle w-25" src={pic} alt="logo-footer" data-at2x="assets/img/logo.png"/>
		        			
		        			<p><a>Our Team</a></p>
	                    </div>
		        		<div class="col-md-4 col-lg-4 offset-lg-1 footer-contact wow fadeInDown animated" style={{visibility: "visible",animationName:"fadeInDown"}}>
		        			<h4>Contact</h4>
		                	<p><i class="fas fa-map-marker-alt"></i> Via Rossini 10, 10136 Turin Italy</p>
		                	<p><i class="fas fa-phone"></i> Phone: (0039) 333 12 68 347</p>
		                	<p><i class="fas fa-envelope"></i> Email: <a href="mailto:hello@domain.com">hello@domain.com</a></p>
		                	<p><i class="fab fa-skype"></i> Skype: you_online</p>
	                    </div>
	                    <div class="col-md-4 col-lg-3 footer-social wow fadeInUp animated" style={{visibility: "visible",animationName:"fadeInUp"}}>
	                    	<h3>Follow us</h3>
	                    	<p>
	                    		<a ><i class="fab fa-facebook"></i></a> 
								<a><i class="fab fa-twitter"></i></a> 
								<a><i class="fab fa-google-plus-g"></i></a> 
								<a><i class="fab fa-instagram"></i></a> 
								<a><i class="fab fa-pinterest"></i></a>
	                    	</p>
	                    </div>
		            </div>
		        </div>
	        </div>
	        <div style={{backgroundColor:"black"}} class="footer-bottom">
	        	<div class="container">
	        		<div class="row">
	           			<div class="col-md-5 footer-copyright">
	                    	<p>© ExpressU</p>
	                    </div>
	           		</div>
	        	</div>
	        </div>
        
    </>
  )
}

export default Footer
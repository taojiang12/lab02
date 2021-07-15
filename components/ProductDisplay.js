app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    ` <div class="product-display">
        <div class="product-container">
        <div class="product-image">
        <div :class="{outofstockimg: !inStock}"><img :src="image"></div>
        </div>
        <div class="product-info">
            <h1>{{content}}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            
            <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"class="color-circle" :style="{ backgroundColor : variant.color }"></div>
            <button class=" button " :disabled='!inStock' :class="{disabledButton: !inStock}" @click="addToCart ">Add to Cart</button>
            <button class=" button "  @click="clearCart">Clear Cart</button>
        </div>
    </div>
</div>
                <review-list v-if="reviews.length":reviews="reviews"></review-list>
                <review-form @review-submited="addReview"></review-form>
</div>`,
data() {
    return {
        product: 'Shoes',
        brand: 'SE 331',


        inventory: 100,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' , quantity:50},
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity:50 }
        ],
        activeClass: true,
        selectVariant:0,
        reviews: [],
        cart: 0,
        onSale:  true
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectVariant].quantity)
    },
    clearCart(){
        this.$emit('clear-cart')
    },
    updateImage(variantImage) {
        this.image = variantImage
    },
    updateVariant(index){
        this.selectVariant = index;
    },
    addReview(review){
        this.reviews.push(review)
        console.log(this.reviews)
    }
},
computed: {
    title(){
        return this.brand + ' ' + this.product;
    },
    image(){
        return this.variants[this.selectVariant].image;
    },
    inStock(){
        return this.variants[this.selectVariant].quantity;
    },
    shipping(){
        if (this.premium){
            return 'Free'
        }
        return 30
    },
    content(){
        if(this.onSale==true){
            return this.brand + ' ' + this.product + ' On Sale';
        }else{
            return this.brand + ' ' + this.product + ' Out of Sale';
        }
    }
}
})

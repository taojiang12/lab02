app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="product-display">
         <div class="product-container">
         <div class="product-image">
         <img v-bind:src="image">
         </div>
         <div class="product-info">
         <h1>{{title}}</h1>
         <p v-if="inStock">In stock</p>
         <p v-else>Out of Stock</p>
         <p>Shipping :{{shipping}}</p>
         
         <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor:variant.color}" >{{ variant.color }}</div>
         <button class=" button " :disabled='!inStock' :class="{disabledButton:!inStock}" @click="addToCart ">Add to Cart</button>
         <button class=" button "  @click="del">Delete to Cart</button>
          </div>
          </div>
          </div>`,
    data() {
        return {
            product: 'Shoes',
            brand: 'SE 331',
            inventory: 100,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ],
            selectedVariant: 0,
            cart: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        del() {
           
            this.$emit('del-to-cart')
        },
        updateImage(variantImage) {
            this.image = variantImage
        },
        updateVariant(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 30
        }

    }
})
app.component('productdetails', {
    props: {
        details: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `
     <p>Show details :{{showdetails}}</p>
     `,
    computed: {
        showdetails() {
            if (this.details == true) {
                return 'Showing the details value of the product'
            }
            return 'Nothing will show '
        }

    }
})


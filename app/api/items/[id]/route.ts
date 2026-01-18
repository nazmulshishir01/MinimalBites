import { NextRequest, NextResponse } from 'next/server'

// Menu items data
const items = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, fresh lettuce, tomato, pickles, and our secret sauce on a toasted brioche bun.",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    category: "burgers",
    rating: 4.8,
    reviews: 234,
    preparationTime: "15-20 min",
    calories: 650,
    ingredients: ["Beef Patty", "Cheddar Cheese", "Lettuce", "Tomato", "Pickles", "Secret Sauce", "Brioche Bun"],
    isPopular: true,
    isNew: false
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional Italian pizza with San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    category: "pizza",
    rating: 4.9,
    reviews: 189,
    preparationTime: "20-25 min",
    calories: 850,
    ingredients: ["Pizza Dough", "San Marzano Tomatoes", "Fresh Mozzarella", "Fresh Basil", "Olive Oil"],
    isPopular: true,
    isNew: false
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Warm, gooey chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    category: "desserts",
    rating: 4.7,
    reviews: 156,
    preparationTime: "10-15 min",
    calories: 420,
    ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla Ice Cream"],
    isPopular: true,
    isNew: false
  },
  {
    id: 4,
    name: "Tropical Smoothie",
    description: "Refreshing blend of mango, pineapple, banana, and coconut milk topped with chia seeds.",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
    category: "drinks",
    rating: 4.6,
    reviews: 98,
    preparationTime: "5 min",
    calories: 280,
    ingredients: ["Mango", "Pineapple", "Banana", "Coconut Milk", "Chia Seeds"],
    isPopular: true,
    isNew: false
  },
  {
    id: 5,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing with grilled chicken.",
    price: 11.99,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    category: "salads",
    rating: 4.5,
    reviews: 87,
    preparationTime: "10 min",
    calories: 380,
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing", "Grilled Chicken"],
    isPopular: false,
    isNew: false
  },
  {
    id: 6,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni pizza with mozzarella cheese and our signature tomato sauce on a crispy crust.",
    price: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    category: "pizza",
    rating: 4.7,
    reviews: 156,
    preparationTime: "20-25 min",
    calories: 920,
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Pepperoni"],
    isPopular: false,
    isNew: false
  },
  {
    id: 7,
    name: "BBQ Bacon Burger",
    description: "Smoky BBQ sauce, crispy bacon, onion rings, and cheddar cheese on a premium beef patty.",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500",
    category: "burgers",
    rating: 4.8,
    reviews: 198,
    preparationTime: "15-20 min",
    calories: 780,
    ingredients: ["Beef Patty", "Bacon", "BBQ Sauce", "Onion Rings", "Cheddar", "Bun"],
    isPopular: false,
    isNew: true
  },
  {
    id: 8,
    name: "Iced Caramel Latte",
    description: "Espresso with cold milk, ice, and sweet caramel syrup, topped with whipped cream.",
    price: 5.49,
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    category: "drinks",
    rating: 4.5,
    reviews: 112,
    preparationTime: "5 min",
    calories: 250,
    ingredients: ["Espresso", "Milk", "Caramel Syrup", "Whipped Cream", "Ice"],
    isPopular: false,
    isNew: false
  },
  {
    id: 9,
    name: "Garlic Bread",
    description: "Crispy baguette slices toasted with garlic butter and herbs, perfect as a starter.",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=500",
    category: "sides",
    rating: 4.4,
    reviews: 76,
    preparationTime: "8 min",
    calories: 220,
    ingredients: ["Baguette", "Garlic Butter", "Parsley", "Italian Herbs"],
    isPopular: false,
    isNew: false
  },
  {
    id: 10,
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: 7.99,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    category: "desserts",
    rating: 4.9,
    reviews: 143,
    preparationTime: "Ready",
    calories: 380,
    ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Cocoa", "Eggs"],
    isPopular: false,
    isNew: true
  },
  {
    id: 11,
    name: "Greek Salad",
    description: "Fresh cucumbers, tomatoes, red onions, olives, and feta cheese with olive oil dressing.",
    price: 10.99,
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500",
    category: "salads",
    rating: 4.6,
    reviews: 92,
    preparationTime: "8 min",
    calories: 320,
    ingredients: ["Cucumber", "Tomatoes", "Red Onion", "Kalamata Olives", "Feta Cheese", "Olive Oil"],
    isPopular: false,
    isNew: false
  },
  {
    id: 12,
    name: "French Fries",
    description: "Golden crispy fries seasoned with sea salt, served with ketchup and mayo.",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
    category: "sides",
    rating: 4.3,
    reviews: 234,
    preparationTime: "10 min",
    calories: 365,
    ingredients: ["Potatoes", "Sea Salt", "Vegetable Oil"],
    isPopular: false,
    isNew: false
  }
]

// GET single item
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id
  const item = items.find(i => i.id === parseInt(id))
  
  if (item) {
    return NextResponse.json(item)
  } else {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  }
}

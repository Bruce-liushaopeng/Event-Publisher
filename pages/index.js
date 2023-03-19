import fs from 'fs/promises'; // file system module, can only used on the server side. because client cannot access file system
import path from 'path';
function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}> {product.title} </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath) //block the execution til it done
  const data = JSON.parse(jsonData);
  // prepares the props for my component, happens before component render.
  return {
    props: {
      //always need to return a props key
      products: data.products
    },
  }
}

export default HomePage

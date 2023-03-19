import fs from "fs/promises" // file system module, can only used on the server side. because client cannot access file system
import path from "path"
import Link from "next/link"
function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>{" "}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps(context) {
  console.log("re-generating....")
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filePath) //block the execution til it done
  const data = JSON.parse(jsonData)
  // prepares the props for my component, happens before component render.

  if (!data) {
    return {
      redirect: {
        destination: "/nodata",
      },
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      //always need t o return a props key
      products: data.products,
    },
    revalidate: 10
  }
}

export default HomePage

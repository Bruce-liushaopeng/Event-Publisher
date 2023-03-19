import { Fragment } from "react"
import fs from "fs/promises"
import path from "path"

function ProductDetailPage(props) {
    const {loadedProduct} = props;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context //params contains all the key-value pairs, which come from the URL dynamic fragment
  const productId = params.pid

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filePath) //block the execution til it done
  const data = JSON.parse(jsonData)

  const product = data.products.find((p) => p.id === productId)

  return {
    props: {
        loadedProduct: product
    }
  }
}

export default ProductDetailPage

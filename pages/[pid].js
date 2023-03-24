import { Fragment } from "react"
import fs from "fs/promises"
import path from "path"

function ProductDetailPage(props) {
  const { loadedProduct } = props

  if (!loadedProduct) {
    //used when dynamic props is not loaded yet, prevent page crash.
    return <p>loading</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticPaths() {
  const data = await getData()
  const ids = data.products.map((product) => product.id)
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))
  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filePath) //block the execution til it done
  const data = JSON.parse(jsonData)

  return data
}

export async function getStaticProps(context) {
  const { params } = context //params contains all the key-value pairs, which come from the URL dynamic fragment
  const productId = params.pid

  const data = await getData()

  const product = data.products.find((p) => p.id === productId)

  if (!product) {
    return {notFound: true}
  }

  return {
    props: {
      loadedProduct: product,
    },
  }
}

export default ProductDetailPage

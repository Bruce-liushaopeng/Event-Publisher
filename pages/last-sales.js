import { useEffect, useState } from "react"
import useSWR from "swr"
function LastSalesPage() {
  const [sales, setSales] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const { data, error } = useSWR(
    "https://nextjs-course-7335a-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  )

  useEffect(() => {
    const transformedSales = []
    for (const key in data) {
      transformedSales.push({
        id: key,
        userName: data[key].username,
        volumes: data[key].volume,
      })
    }
    setSales(transformedSales)
  }, [data])

  //   useEffect(() => {
  //     setIsLoading(true)
  //     fetch(
  //       "https://nextjs-course-7335a-default-rtdb.firebaseio.com/sales.json"
  //   ).then((res) =>
  //     res.json().then((data) => {
        // const transformedSales = []
        // for (const key in data) {
        //   transformedSales.push({
        //     id: key,
        //     userName: data[key].username,
        //     volumes: data[key].volume,
        //   })
        // }
        // setSales(transformedSales)
  //         setIsLoading(false)
  //       })
  //     )
  //   }, [])

  if (error) {
    return <p> Fail to load </p>
  }
  if (!data || !sales) {
    return <p> Loading ...</p>
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {" "}
          {sale.userName} - ${sale.volumes}{" "}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage

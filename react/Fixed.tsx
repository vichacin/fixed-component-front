import React from 'react'
import { useQuery } from 'react-apollo';
// import getProducts from './graphql/getProducts.gql';
import getFixedPrice from './graphql/getFixedPrice.gql';
import { useProduct } from 'vtex.product-context';

interface queryOpt {
  skuId: string,
  tableName: string
}

interface queryData {
  getFixedPrice: [
    {
      value: number,
      minQuantity: number
    }
  ]
}

function Fixed() {

  const productContextValue = useProduct();

  const { selectedItem } = useProduct();

  const tableName = '2';

  const { data, loading, error } = useQuery<queryData, queryOpt>(getFixedPrice, {
    variables: {
      "skuId": selectedItem?.itemId,
      "tableName": tableName
    },

    // Avoid private query in front
    ssr: false
  })

  if (selectedItem){
    if (loading){
      console.log("Cargando");
    } else {
      if (error){
        console.log('----error----', error);
      } else if (data){
        console.log('----data----', data.getFixedPrice);
        console.log('length', data?.getFixedPrice.length);
      }
    }
  }

  console.log('data ->', data);
  console.log('value ->', data?.getFixedPrice[0].value);
  console.log('min ->', data?.getFixedPrice[0].minQuantity);
  console.log('sku ->', productContextValue.selectedItem.itemId);

  // if (!data || (data as any).length === 0 || data.getFixedPrice.length === 0){
  //   return `SkuId: ${productContextValue.selectedItem.itemId} no tiene un precio fijo para la tabla: ${tableName}`;
  // }
    return <div>
              <p>SkuId: {productContextValue.selectedItem.itemId}</p>
              <p>Fixed price: {data?.getFixedPrice[0].value}</p>
              <p>minQuantity: {data?.getFixedPrice[0].minQuantity}</p>
          </div>
}

export default Fixed

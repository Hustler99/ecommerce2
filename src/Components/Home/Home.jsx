import React from 'react'
import Categories from '../Categories/Categories'
import MainSlider from './../MainSlider/MainSlider';
import Products from '../Products/Products';

export default function Home() {
  return (
    <>
      <MainSlider/>
      <Categories />
      <Products/>
      
    </>
  )
}

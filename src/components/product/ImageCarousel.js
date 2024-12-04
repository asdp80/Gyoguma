// 다수의 이미지를 좌우 스크롤(버튼)로 보여주는 컴포넌트
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel'
 
const ImageCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const {images=[]} = props

  return (
    <div className='px-16 w-full h-full'>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={40}
        leftChevron={<button><img className='rotate-180'src='/images/arrow.png' alt='arrow'/></button>}
        rightChevron={<button><img src='/images/arrow.png' alt='arrow'/></button>}
        outsideChevron
        showSlither
        chevronWidth={chevronWidth}>
        {images.map((image, index) => (
            <div key={index} className='flex w-auto h-full justify-center items-center'>
                <img key={index} className='m-auto w-full h-full max-w-full max-h-96 object-contain' src={image} alt={`product${index}`}/>
                {/* 참고 : 이미지는 URL로 받는다고 가정, 만약 그렇지 않다면 추가적인 변환 필요 */}
            </div>
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default ImageCarousel
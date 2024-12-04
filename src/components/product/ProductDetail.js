// 상품 상세 정보 컴포넌트
// 상품 이미지, 상세 정보, 판매자 정보, 채팅하기
import { useState } from 'react';
import Button from '../common/Button.js';
import ImageCarousel from './ImageCarousel';
import ProductPlace from './ProductPlace'

const ProductDetail = (props) => {
    const {
        imageURLs=['/images/logo.png'],
        title='title',
        price='price',
        userInfo='userInfo',
        description='description',
    } = props
    const [tabIndex, setTabIndex] = useState(0)

    const onTabClick = (tabNum) => {
        setTabIndex(tabNum)
    }

    return (
        <div className="container mx-auto p-6">
          {/* 상품 상세 페이지 컨테이너 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
            {/* 왼쪽 영역: 이미지 섹션 */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* 메인 이미지 영역 */}
                <div className="aspect-square bg-gray-100 rounded-lg">
                  <ImageCarousel images={imageURLs}/>
                </div>
              </div>
              {/* 썸네일 이미지 목록 */}
              <div className="grid grid-cols-4 gap-2">
                {imageURLs.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg"><img src={image} alt='product'/></div>
                ))}
              </div>
            </div>
    
            {/* 오른쪽 영역: 상품 정보 섹션 */}
            <div className="space-y-6 row-span-2">
              {/* 기본 정보 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <div className="text-xl font-semibold">{price}</div>
                  <div className="text-gray-600">{userInfo}</div>
                  <div><Button isLink={false} className='w-full'>채팅하기</Button></div>
                </div>
              </div>
            </div>
          </div>
    
          {/* 하단 상세 정보 탭 */}
          <div className="mt-12 bg-white rounded-lg shadow-md">
            <div className="border-b">
              <div className="flex">
                <button
                className={(tabIndex === 0)? 'px-6 py-3 border-b-2 border-gyoguma font-semibold' : 'px-6 py-3'}
                onClick={() => onTabClick(0)}>
                  상품정보
                </button>
                <button
                className={(tabIndex === 1)? 'px-6 py-3 border-b-2 border-gyoguma font-semibold' : 'px-6 py-3'}
                onClick={() => onTabClick(1)}>
                    거래장소
                </button>
              </div>
            </div>
            <div className="p-8">
              {(tabIndex === 0) ? description:<ProductPlace />}
            </div>
          </div>
        </div>
      );
}

export default ProductDetail
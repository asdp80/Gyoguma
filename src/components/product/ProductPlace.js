// 거래장소를 표시하는 컴포넌트.
const ProductPlace = (props) => {
    const {
        place='0',
    } = props
    // 거래 장소 사진을 미리 갖고 있다고 가정함, 다음 코드는 임시로 지정
    const pictureURLs=['/images/logo.png']
    const placeNames=['placeName']
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <span className='text-2xl p-3'>{placeNames[Number(place)]}</span>
            <img className='max-w-64 max-h-64 object-fill' src={pictureURLs[Number(place)]} alt='place'/>
        </div>
    )
}

export default ProductPlace
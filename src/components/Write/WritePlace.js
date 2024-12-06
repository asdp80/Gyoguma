import DropDownSelector from "../common/DropDownSelector"

// 거래 장소를 드롭다운으로 입력하고, 그에따라 이미지로 표시하는 컴포넌트.
const WritePlace = (props) => {
    const {placeIndex, onChange, name} = props

    const pictureURLs=['/images/logo.png']
    const placeNames=[
        '',
        'AI공학관',
        '가천관',
        '전자정보도서관',
        '스타벅스앞',
    ]
    const places = [
        {value : '0', text : '선택'},
        {value : '1', text : 'AI공학관'},
        {value : '2', text : '가천관'},
        {value : '3', text : '전자정보도서관'},
        {value : '4', text : '스타벅스앞'},
    ]

    return (
        <>
        <DropDownSelector
        name={name}
        value={placeIndex}
        options={places}
        onChange={onChange}/>
        <div className='flex flex-col justify-center items-center'>
            <span className='text-2xl p-3'>{placeNames[Number(placeIndex)]}</span>
            <img className='max-w-64 max-h-64 object-fill' src={pictureURLs[Number(placeIndex)]} alt='place'/>
        </div>
        </>
        
        
    )
}

export default WritePlace
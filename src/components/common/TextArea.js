// 긴 텍스트 입력 컴포넌트
// 상품 설명 등 (자동 높이 조절 가능)

const TextArea = (props) => {
    const {cols='50', rows='25'} = props
    return (
        <textarea className='w-full px-4 py-2 rounded-md  border-2 border-gyoguma focus:border-gyoguma-dark outline-none'
        cols={cols} rows={rows} />
    )
}

export default TextArea
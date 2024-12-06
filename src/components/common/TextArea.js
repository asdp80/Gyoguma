// 긴 텍스트 입력 컴포넌트
// 상품 설명 등 (자동 높이 조절 가능)
import clsx from "clsx"

const TextArea = (props) => {
    const {
        name='',
        cols='50', 
        rows='25', 
        className='',
        value='',
        onChange=null, 
    } = props
    const baseClass='w-full px-4 py-2 rounded-md  border-2 border-gyoguma focus:border-gyoguma-dark outline-none'
    return (
        <textarea 
        name={name}
        className={clsx(baseClass, className)}
        cols={cols} rows={rows}
        value={value}
        onChange={onChange}/>
    )
}

export default TextArea
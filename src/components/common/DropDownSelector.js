import clsx from "clsx"

// 장소, 카테고리 등 미리 준비된 선택지 중 골라 입력받는 입력폼
const DropDownSelector = (props) => {
    const {
        name='',
        value='',
        onChange='',
        className='',
        options=[]
    } = props
    const baseClass='mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500'
    return (
        <select
            name={name}
            required
            value={value}
            onChange={onChange}
            className={clsx(baseClass,className)}>
            {options.map(({value, text, key}) => (
                <option key={key} value={value}>{text}</option>
            ))}
        </select>
    )
}

export default DropDownSelector
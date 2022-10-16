import Button from '../buttons'
const Card = ({ id, title, price, description, image, text, onClick }) => {


    return (
        <div key={id} className="card">
            {image &&
                <img src={image} alt='product image' />
            }

            <div className="cardTitleAndDescription">
                <strong className="title">{title}</strong>
                <p className="description">({description})</p>
            </div>

            <div className="cardPriceAndButton">
                <strong className="price">R$ {price.toFixed(2)}</strong>
                <Button type='button' text={text} handleClick={onClick}></Button>
            </div>
        </div>
    )
}

export default Card


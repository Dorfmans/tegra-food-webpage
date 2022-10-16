import Image from "next/image";

const GoogleInput = ({
    image,
    type,
    placeholder,

}) => {
    return (
        <div className="googleInputContainer">

            <div className="googleInput">

                <Image
                    src={image}
                    alt="Input Icon"
                    className="googleInputIcon"
                    width={30}
                    height={30}
                />

                <input
                    type={type}
                    placeholder={placeholder}
                />

            </div>

        </div>
    );
};


export default GoogleInput
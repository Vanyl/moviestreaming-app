import amazonPrimeLogo from "../assets/amazon_prime.png"

const Footer = () => {
    return (
        <>
            <footer className="flex flex-col p-6 items-center justify-center ">
            <img className="max-h-[32px] max-w-[110px] px-3" src={amazonPrimeLogo} alt="Prime Video" />
            <ul className="text-blue-300 list-none font-semibold flex justify-center gap-x-4">
                <li className="hover:text-blue-200 cursor-pointer">Conditions d'utilisations et Politique de confidentialité</li>
                <li className="hover:text-blue-200 cursor-pointer">Donnez-nous votre avis</li>
                <li className="hover:text-blue-200 cursor-pointer">Aide</li>
                <li className="hover:text-blue-200 cursor-pointer">Avertissement relatif aux cookies</li>
                <li className="text-gray-600">&#169; 1996-2024, Amazon.com, Inc ou ses filiales</li>
            </ul>
            </footer>
        </>

    )
}

export default Footer;
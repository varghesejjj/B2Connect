import PropTypes from "prop-types";
import { useEffect } from "react";

const Header = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title]);

    return (
        <header className="header">
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

Header.defaultProps = {
    title: "B2Connect",
};

// CSS in JS
// const csStyling = {
//     color: 'red',
//     backgroundColor: 'black'
// }
export default Header;
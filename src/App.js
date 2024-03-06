import TopBar from './features/top-bar';
import CurrentWeather from './features/current-weather';
import FavoriteLocations from './features/favorite-locations';

// Styles
import styles from './App.module.css';

const App = () => (
    <div className={styles.Wrapper}>
        <FavoriteLocations />
        <div className={styles.Content}>
            <header>
                <TopBar />
            </header>
            <main>
                <CurrentWeather />
            </main>
        </div>
    </div>
);

export default App;

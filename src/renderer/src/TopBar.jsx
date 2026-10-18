import { useState, useEffect } from 'react';
import styles from './assets/TopBar.module.css';

function formatTime(timeElapsed) {
	// Formats the time elapsed in seconds into a string of the format "HH:MM:SS".
	const hours = Math.floor(timeElapsed / 3600);
	const minutes = Math.floor((timeElapsed % 3600) / 60);
	const seconds = timeElapsed % 60;
	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Shared wrapper so each icon only needs its paths.
function Icon({ children }) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{children}
		</svg>
	);
}

function Divider() {
	return <div className={styles.divider} />;
}

function TopBar({ numWindows, setNumWindows }) {
	const [timing, setTiming] = useState(false);
	const [timeElapsed, setTimeElapsed] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [position, setPosition] = useState({ x: 0.0, y: 0.0, z: 0.0 });
    const [connectionSpeed, setConnectionSpeed] = useState({ upload: 0.0, download: 0.0 });

	useEffect(() => {
		// runs every time timing changes
		if (!timing) return;

		const id = setInterval(() => {
			setTimeElapsed((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(id);

	}, [timing])

	return (
		<header className={styles.topBar}>
			{/* Stopwatch */}
			<div className={styles.group}>
				<span className={styles.icon}>
					<Icon>
						<circle cx="12" cy="14" r="7" />
					    <path d="M12 14V10.5" />
						<path d="M10 3h4" />
						<path d="M12 3v4" />
					</Icon>
				</span>
				<span className={`${styles.value} ${styles.clock}`}>{formatTime(timeElapsed)}</span>
				<button
					type="button"
					className={styles.iconButton}
					aria-label={timing ? "Stop stopwatch" : "Start stopwatch"}
					title="Start stopwatch"
					onClick={() => setTiming(!timing)}
				>
					{timing ? (
					<Icon>
						{/* arrow */}
						<path d="M9 5v14M15 5v14" />
					</Icon>
					
					) : (
					<Icon>
						{/* double line */}
						<path d="M8 5l11 7-11 7z" />
					</Icon>
					)}
				</button>
				<button
					type="button"
					className={styles.iconButton}
					aria-label="Reset stopwatch"
					title="Reset stopwatch"
					onClick={() => {setTimeElapsed(0); setTiming(false)}}
				>
					<Icon>
						<path d="M4 5v5h5" />
						<path d="M5.5 14a7 7 0 1 0 1.2-6.6L4 10" />
					</Icon>
				</button>
			</div>

			<Divider />

			{/* Window count */}
			<div className={styles.windows} role="group" aria-label="Windows in view">
				<span className={styles.label}>WINDOWS</span>
				{[1, 2, 4, 6, 8].map((n) => (
					<button
						key={n}
						type="button"
						className={`${styles.windowButton} ${n === numWindows ? styles.active : ''}`}
                        onClick ={() => setNumWindows(n)}
					>
						{n}
					</button>
				))}
			</div>

			<div className={styles.spacer} />

			{/* Temperature */}
			<div className={styles.group}>
				<span className={styles.icon}>
					<Icon>
						<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z" />
						<path d="M12 11v6" />
					</Icon>
				</span>
				<span className={styles.value}>{temperature == 0 ? "--.-" : temperature.toFixed(1)} °C</span>
			</div>

			<Divider />

			{/* Position */}
			<div className={styles.position}>
				{['x', 'y', 'z'].map((axis) => (
					<div key={axis} className={styles.axis}>
						<span className={styles.label}>{axis}</span>
						<span className={styles.value}>{position[axis].toFixed(1)}</span>
					</div>
				))}
			</div>

			<Divider />

			{/* Connection speed */}
			<div className={styles.group} role="group" aria-label="Connection speed">
				<span className={styles.icon}>
					<Icon>
						<path d="M12 16V4" />
						<path d="M7 9l5-5 5 5" />
						<path d="M5 20h14" />
					</Icon>
				</span>
				<span className={styles.value} aria-label="Upload speed">
                    {connectionSpeed.upload.toFixed(1)}
				</span>
				<span className={styles.icon} style={{ marginLeft: 8 }}>
					<Icon>
						<path d="M12 4v12" />
						<path d="M7 11l5 5 5-5" />
						<path d="M5 20h14" />
					</Icon>
				</span>
				<span className={styles.value} aria-label="Download speed">
					{connectionSpeed.download.toFixed(1)}
				</span>
				<span className={styles.label}>Mbps</span>
			</div>

			{/* Inputs menu + power */}
			<div className={styles.actions}>
				<button
					type="button"
					className={styles.iconButton}
					aria-label="Open inputs menu"
					title="Inputs"
				>
					<Icon>
						<rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
						<rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" />
						<path
							d="M6.5 10v1.5a2.5 2.5 0 0 0 2.5 2.5h6a2.5 2.5 0 0 1 2.5 2.5V14"
							strokeWidth="2.5"
						/>
					</Icon>
				</button>
				<button
					type="button"
					className={`${styles.iconButton} ${styles.power}`}
					aria-label="Power"
					title="Power"
				>
					<Icon>
						<path d="M12 3v9" />
						<path d="M7 6.5a8 8 0 1 0 10 0" />
					</Icon>
				</button>
			</div>
		</header>
	);
}

export default TopBar;

import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import {AlertInfoContext} from "../setup/utils/AlertInfoContext.jsx";
import Alert from "../components/Alert.jsx";

export function AuthLayout() {

	const [alertInfo, setAlertInfo] = useState(null)

	return (
		<AlertInfoContext.Provider value={{alertInfo, setAlertInfo}}>
			{
				alertInfo!==null &&
				<Alert
					alertType={alertInfo.type}
					title={alertInfo.text}
					description={alertInfo.subtext}
					onClose={()=>setAlertInfo(null)}
					redirectUrl={alertInfo.redirectUrl}
				/>
			}
			<Outlet/>
		</AlertInfoContext.Provider>
	)
}
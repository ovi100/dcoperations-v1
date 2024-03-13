import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonScan: { width: 50, height: 50 },
  buttonProfile: { width: 30, height: 30 },
  buttonLogin: {
    height: 55,
    backgroundColor: "#AC3232",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLoginLoading: {
    height: 55,
    backgroundColor: "#AC3232",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLg: {
    height: 55,
    backgroundColor: "#3758FA",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  lgText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonXs: {
    height: 35,
    backgroundColor: "#3758FA",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  xsText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default styles;

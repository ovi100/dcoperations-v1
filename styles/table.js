import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  table: {
    marginVertical: 0,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#7B7890",
    marginBottom: 5,
    paddingVertical: 8,
  },
  headerCell: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F2EFEF",
    borderRadius: 8,
    marginTop: 10,
    paddingLeft: 15,
    paddingVertical: 15,
  },
  link: {
    color: "#3758FA",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default styles;

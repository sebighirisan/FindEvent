 import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        padding: 24,
        backgroundColor:"#001f3f"
      },
      title: {
        fontSize: 31,
        fontWeight: '700',
        color:'#e1e2e1',
        marginBottom: 6,
      },
      subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color:'#929292',
      },
      /** Header */
      header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
      },
      /** Form */
      form: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      formAction: {
        marginTop: 4,
        marginBottom: 16,
      },
      formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e1e2e1',
        textAlign: 'center',
      },
      formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#e1e2e1',
        textAlign: 'center',
        letterSpacing: 0.15,
      },
      /** Input */
      input: {
        marginBottom: 16,
      },
      inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color:'#E5EFFF',
        marginBottom: 8,
      },
      inputControl: {
        height: 50,
        backgroundColor:'#e1e2e1',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color:'black',
        borderWidth: 1,
        borderColor:'#e1e2e1',
        borderStyle: 'solid',
      },
      /** Button */
      btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor:'#e1e2e1',
        borderColor: '#222',
      },
      btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#F9FAFB ',
      },
    paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
    color: '#000',
  },
  container2: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#001f3f',
  },
  btnSave:{
     flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor:'#e1e2e1',
        borderColor: '#222',
        position:'absolute'
  }
});

export default styles;
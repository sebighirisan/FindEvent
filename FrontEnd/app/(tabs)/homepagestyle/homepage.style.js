  import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container2: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        padding: 24,
        backgroundColor:"#F9FAFB"
        
      },
      title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
      },
      subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
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
        color: '#222',
        textAlign: 'center',
      },
      formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
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
        color: '#222',
        marginBottom: 8,
      },
      inputControl: {
        height: 50,
        backgroundColor: '#ffb6c1',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#222',
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
        backgroundColor: '#ffb6c1',
        borderColor: '#222',
      },
      btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#222',
      },
      menu: {
        marginTop: 10,
        
    },
    menuItem: {
        backgroundColor: '#001f3f',
        paddingVertical: 8,     // smaller top/bottom padding
        paddingHorizontal: 12,  // smaller left/right padding
        borderRadius: 8,
        marginBottom: 35,
        alignSelf: 'flex-start',
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12, 
  },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default styles;
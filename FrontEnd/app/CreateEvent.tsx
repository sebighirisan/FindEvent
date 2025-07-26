 import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/auth.styles';
 
 const CreateEvent = () => {
    const [form,setForm] = useState({
        Name: '',
        Location: '',
        Hours: '',
        Price: '',
        Thematic: '',
        Description: '',
        Date: ''
      });
   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // adjust if header/statusbar overlaps
        >
         <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
               <View style={styles.header}>
                 <Text style={styles.title}>
                    <Text style={{color:'#e1e2e1'}} >Create your Event</Text>
                 </Text>
                 <Text style={styles.subtitle}>
                  Add your event details!
                 </Text>
               </View>
               <View style={styles.form}>
               <View style={styles.input}>
                           <Text style={styles.inputLabel}>Event Name</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Name => setForm({ ...form, Name })}
                             placeholder="Your name event"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Name} />
                         </View>
                         <View style={styles.input}>
                           <Text style={styles.inputLabel}>Location</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Location => setForm({ ...form, Location })}
                             placeholder="Your location event"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Location} />
                         </View>
                         <View style={styles.input}>
                           <Text style={styles.inputLabel}>Hours/Duration</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Hours => setForm({ ...form, Hours })}
                             placeholder="How much time is your event going"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Hours} />
                         </View>
                        
                          <View style={styles.input}>
                           <Text style={styles.inputLabel}>Price</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Price => setForm({ ...form, Price })}
                             placeholder="How much cost?"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Price} />
                         </View>
                          <View style={styles.input}>
                           <Text style={styles.inputLabel}>Thematic</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Thematic => setForm({ ...form, Thematic })}
                             placeholder="Thematic of event"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Thematic} />
                         </View>
                          <View style={styles.input}>
                           <Text style={styles.inputLabel}>Date</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             onChangeText={Date => setForm({ ...form, Date })}
                             placeholder="When?"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Date} />
                         </View>
                          <View style={styles.input}>
                           <Text style={styles.inputLabel}>Hours/Duration</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                             keyboardType="email-address"
                             onChangeText={Hours => setForm({ ...form, Hours })}
                             placeholder="How much time is your event going"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Hours} />
                         </View>
                          <View style={styles.input}>
                           <Text style={styles.inputLabel}>Hours/Duration</Text>
                           <TextInput
                             autoCapitalize="none"
                             autoCorrect={false}
                             clearButtonMode="while-editing"
                            
                             onChangeText={Hours => setForm({ ...form, Hours })}
                             placeholder="How much time is your event going"
                             placeholderTextColor="#6b7280"
                             style={styles.inputControl}
                             value={form.Hours} />
                         </View>
                        <View style={styles.input}>
                          <Text style={styles.inputLabel}>Description</Text>
                          <TextInput
                            autoCapitalize="sentences"
                            autoCorrect={true}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={Description => setForm({ ...form, Description })}
                            placeholder="Write a short description of your event"
                            placeholderTextColor="#6b7280"
                            style={[styles.inputControl, { height: 100, textAlignVertical: 'top' }]}
                            value={form.Description}/>
                        </View>

                </View>
                <View style={styles.formAction}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          
                                          }}>
                                        <View style={styles.btnSave}>
                                            <Text style={styles.btnText}>Save</Text>
                                        </View>
                                        </TouchableOpacity>
                                    </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
   )
 }
 
 export default CreateEvent
 
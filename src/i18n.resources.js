export default {
  en: {
    translation: {
      login: {
        email: "Email",
        password: "Password",
        login: "Login",
        showPassword: "Show Password",
        errors: {
          e1: "Please enter a valid e-mail. Example: myEmail@company.abc",
          e2: "Password is required",
          e3: "The credentials you provided are not correct.",
          e4: "The token received by server could not be validated.",
          e5: "Could not connect to server. Please consult your network administrator.",
          e6: "An error occurred while trying to contact the server. Please contact your administrator.",
          e7: "ACL module could not be implemented. Please contact your administrator.",
        }
      },
      mainPanel: {
        home: "Home",
        models: "Models",
        admin: "Admin",
        logout: "Logout",
        translate: "Change language",
        errors: {
          e1: "An error occurred while trying load the new language.",
        }
      },
      modelPanels: {
        addNew: "Add new",
        importCSV: "Import from CSV",
        exportCSV: "Export to CSV",
        viewDetails: "View details",
        edit: "Edit",
        delete: "Delete",
        actions: "Actions",
        rowsPerPage: "Rows per page",
        of: "of",

        details: "Details",
        detailOf: "Detail of",
        new: "New",
        editing: "Editing",
        //search
        search: "Search",
        clearSearch: "Clear search",
        showSearchBar: "Show search bar",
        hideSearchBar: "Hide search bar",
        //--
        completed: "completed",
        model: "Model",
        attributes: "Attributes",
        associations: "Associations",
        rows: "Rows",
        noData: "No data to display",
        noItemsAdded: "No items added",
        save: "Save",
        uploading: "Uploading",
        cancel: "Cancel",
        close: "Close",
        upload: "Upload",
        uploadHelper: "Please choose the CSV file you want to import.",
        //delete confirmation dialog
        deleteMsg: "Are you sure you want to delete this item?",
        deleteReject: "Do not delete",
        deleteAccept: "Yes, delete",
        //save/update confirmation dialogs
        saveIncompleteAccept: "YES, SAVE",
        saveIncompleteReject: "DON'T SAVE YET",
        updateAccept: "I understand",
        cancelChangesAccept: "YES, EXIT",
        cancelChangesReject: "STAY",
        //noAcceptableFields
        invalidFields: "Some fields are not valid.",
        invalidFieldsB: "To continue, please correct these fields.",
        //noIncompleteFields
        incompleteFields: "Some fields are empty.",
        incompleteFieldsB: "Do you want to continue anyway?",
        //cancelChanges
        cancelChanges: "The edited information has not been saved",
        cancelChangesB: "Some fields have been edited, if you continue without save, the changes will be lost, you want to continue?",

        //lists
        add: "Add",
        remove: "Remove",
        notAssociated: "Not associated",
        noAssociations: "No associations",
        toAdd: "To add",
        transferToAdd: "Transfer to records to add",
        untransferToAdd: "Remove from records to add",
        associated: "Associated",
        toRemove: "To remove",
        transferToRemove: "Transfer to records to remove",
        alreadyToRemove: "Already on to-remove list",
        untransferToRemove: "Remove from to-remove list",
        toAddHelperA: "Please select ",
        toAddHelperB: " that you want to be associated with this ",
        toRemoveHelperA: "Please select ",
        toRemoveHelperB: " that you no longer want to be associated with this ",
        theRecord: "the record",
        theRecords: "the records",


        //float & int
        floatMaxErr: "This is a Float field, the maximum valid positive number is 1.79769313486231e+308. Entered value: ",
        floatMinErr: "This is a Float field, the minimum valid negative number is -1.79769313486231e+308. Entered value: ",
        intMaxErr: "This is an Int field, the maximum valid positive number is 2147483647. Entered value: ",
        intMinErr: "This is an Int field, the minimum valid negative number is -2147483647. Entered value: ",
        intRoundedWarning: "This is an Int field, the decimals will be rounded. Value taken: ",
        valueTaken: "Value taken: ",
        invalidNumber: "Invalid number",
        number: "number",
        integer: "integer",
        invalidDate: "Invalid date format",

        //notistack
        gotIt: "Got it",
        dismiss: "Dismiss",

        messages: {
          msg1: "The data has been sent. A report with the status of the import process will be sent to your email.",
          msg2: "Null data received: GraphQL query returns no data.",
          msg3: "File exceeds limit of ",
          //delete
          msg4: "Record deleted successfully.",
          //update
          msg5: "Record updated successfully.",
          //create
          msg6: "Record created successfully.",
        },
        errors: {
          e1: "An error occurred while trying to execute the GraphQL query. Please contact your administrator.",
          e2: "An error occurred while trying to execute the GraphQL query, cannot process server response. Please contact your administrator.",
          e3: "The GraphQL query returned a response with errors. Please contact your administrator.",
        }

      },
    }
  },

  de: {
    translation: {
      login: {
        email: "Email",
        password: "Passwort",
        login: "Einloggen",
        showPassword: "Passwort anzeigen",
        errors: {
          e1: "Bitte geben Sie eine gültige Email-Adresse ein. Beispiel: meineEmail@unternehmen.abc",
          e2: "Passwort wird benötigt",
          e3: "Die von Ihnen angegebenen Anmeldeinformationen sind nicht korrekt.",
          e4: "Das vom Server empfangene Token konnte nicht validiert werden.",
          e5: "Verbindung zum Server konnte nicht hergestellt werden. Bitte wenden Sie sich an Ihren Netzwerkadministrator.",
          e6: "Beim Versuch, eine Verbindung zum Server herzustellen, ist ein Fehler aufgetreten. Bitte wenden Sie sich an Ihren Administrator.",
          e7: "ACL-Modul konnte nicht implementiert werden. Bitte wenden Sie sich an Ihren Administrator.",
        }
      },
      mainPanel: {
        home: "Zuhause",
        models: "Modelle",
        admin: "Admin",
        logout: "Ausloggen",
        translate: "Sprache ändern",
        errors: {
          e1: "Beim Laden der neuen Sprache ist ein Fehler aufgetreten.",
        }
      },
      modelPanels: {
        addNew: "Neue hinzufügen",
        importCSV: "Aus CSV importieren",
        exportCSV: "In CSV exportieren",
        viewDetails: "Details anzeigen",
        edit: "Bearbeiten",
        delete: "Löschen",
        actions: "Aktionen",
        rowsPerPage: "Zeilen pro Seite",
        of: "von",

        details: "Einzelheiten",
        detailOf: "Detail von",
        new: "Neu",
        editing: "Bearbeitung",
        //search
        search: "Suche",
        clearSearch: "Saubere Suche",
        showSearchBar: "Suchleiste anzeigen",
        hideSearchBar: "Suchleiste ausblenden",
        //--
        completed: "abgeschlossen",
        model: "Modell",
        attributes: "Attribute",
        associations: "Verbände",
        rows: "Reihen",
        noData: "Keine Daten zum Anzeigen",
        noItemsAdded: "Keine Artikel hinzugefügt",
        save: "Speichern",
        uploading: "Hochladen",
        cancel: "Stornieren",
        close: "Schließen",
        upload: "Hochladen",
        uploadHelper: "Bitte wählen Sie die CSV-Datei aus, die Sie importieren möchten.",
        //delete confirmation dialog
        deleteMsg: "Möchtest du diesen Gegenstand wirklich löschen?",
        deleteReject: "Nicht löschen",
        deleteAccept: "Ja, löschen",
        //save/update confirmation dialogs
        saveIncompleteAccept: "JA, SPEICHERN",
        saveIncompleteReject: "SPEICHERN SIE NOCH NICHT",
        updateAccept: "ich verstehe",
        cancelChangesAccept: "JA, BEENDEN",
        cancelChangesReject: "BLEIBE",
        //noAcceptableFields
        invalidFields: "Einige Felder sind ungültig.",
        invalidFieldsB: "Bitte korrigieren Sie diese Felder, um fortzufahren.",
        //noIncompleteFields
        incompleteFields: "Einige Felder sind leer.",
        incompleteFieldsB: "Möchtest du trotzdem weitermachen?",
        //cancelChanges
        cancelChanges: "Die bearbeiteten Informationen wurden nicht gespeichert",
        cancelChangesB: "Einige Felder wurden bearbeitet. Wenn Sie ohne Speichern fortfahren, gehen die Änderungen verloren. Möchten Sie fortfahren?",

        //lists
        add: "Hinzufügen",
        remove: "Löschen",
        notAssociated: "Nicht zugeordnet",
        noAssociations: "Keine Assoziationen",
        toAdd: "Hinzufügen",
        transferToAdd: "In Datensätze übertragen, um sie hinzuzufügen",
        untransferToAdd: "Aus den Datensätzen entfernen, um sie hinzuzufügen",
        associated: "Damit verbundenen",
        toRemove: "Zu entfernen",
        transferToRemove: "In zu entfernende Datensätze übertragen",
        alreadyToRemove: "Bereits zu entfernende Liste",
        untransferToRemove: "Aus zu entfernender Liste entfernen",
        toAddHelperA: "Bitte auswählen ",
        toAddHelperB: " die Sie damit verknüpfen möchten ",
        toRemoveHelperA: "Bitte auswählen ",
        toRemoveHelperB: " die Sie nicht mehr mit diesem verknüpfen möchten ",
        theRecord: "der Datensatz",
        theRecords: "die Aufzeichnungen",

        //float & int
        floatMaxErr: "Dies ist ein Float-Feld. Die maximal gültige positive Zahl ist 1.79769313486231e+308. Eingegebener Wert: ",
        floatMinErr: "Dies ist ein Float-Feld. Die minimal gültige negative Zahl ist -1,79769313486231e+308. Eingegebener Wert: ",
        intMaxErr: "Dies ist ein Int-Feld, die maximal gültige positive Zahl ist 2147483647. Eingegebener Wert: ",
        intMinErr: "Dies ist ein Int-Feld, die minimal gültige negative Zahl ist -2147483647. Eingegebener Wert: ",
        intRoundedWarning: "Dies ist ein Int-Feld. Die Dezimalstellen werden gerundet. Wert genommen: ",
        valueTaken: "Wert genommen: ",
        invalidNumber: "Ungültige Nummer",
        number: "nummer",
        integer: "ganze Zahl",
        invalidDate: "Ungültiges Datumsformat",

        //notistack
        gotIt: "Ich habs",
        dismiss: "Entlassen",

        messages: {
          msg1: "Die Daten wurden gesendet. Ein Bericht mit dem Status des Importvorgangs wird an Ihre E-Mail gesendet.",
          msg2: "NULL-Daten empfangen: Die GraphQL-Abfrage gibt keine Daten zurück.",
          msg3: "Datei überschreitet das Limit von ",
          //delete
          msg4: "Datensatz erfolgreich gelöscht.",
          //update
          msg5: "Datensatz erfolgreich aktualisiert.",
          //create
          msg6: "Datensatz erfolgreich erstellt.",
        },
        errors: {
          e1: "Beim Versuch, die GraphQL-Abfrage auszuführen, ist ein Fehler aufgetreten. Bitte wenden Sie sich an Ihren Administrator.",
          e2: "Beim Versuch, die GraphQL-Abfrage auszuführen, ist ein Fehler aufgetreten. Die Serverantwort kann nicht verarbeitet werden. Bitte wenden Sie sich an Ihren Administrator.",
          e3: "Die GraphQL-Abfrage hat eine Antwort mit Fehlern zurückgegeben. Bitte wenden Sie sich an Ihren Administrator.",
        }

      },
    }
  },

  es: {
    translation: {
      login: {
        email: "Cuenta de correo",
        password: "Contraseña",
        login: "Ingresar",
        showPassword: "Mostrar contraseña",
        errors: {
          e1: "Por favor ingrese un correo electrónico válido. Por ejemplo: miCorreo@dominio.abc",
          e2: "Es necesario que ingrese su contraseña.",
          e3: "Las credenciales que ingresó no son correctas.",
          e4: "El token no pudo ser validado.",
          e5: "No se puede establecer conexión con el servidor. Por favor contacte al administrador de la red.",
          e6: "Ocurrió un error al intentar contactar con el servidor. Por favor contacte al administrador de la aplicación.",
          e7: "Ocurrió un error con el módulo ACL. Por favor contacte al administrador de la aplicación.",
        }
      },
      mainPanel: {
        home: "Inicio",
        models: "Modelos",
        admin: "Admin",
        logout: "Salir",
        translate: "Cambiar idioma",
        errors: {
          e1: "Ocurrió un error al intentar cargar el nuevo lenguaje.",
        }
      },
      modelPanels: {
        addNew: "Agregar nuevo",
        importCSV: "Importar de CSV",
        exportCSV: "Exportar a CSV",
        viewDetails: "Ver detalles",
        edit: "Editar",
        delete: "Borrar",
        actions: "Acciones",
        rowsPerPage: "Renglones por página",
        of: "de",

        details: "Detalles",
        detailOf: "Detalle de",
        new: "Nuevo",
        editing: "Editando",
        //search
        search: "Buscar",
        clearSearch: "Limpiar búsqueda",
        showSearchBar: "Mostrar barra de búsqueda",
        hideSearchBar: "Ocultar barra de búsqueda",
        //--
        completed: "completados",
        model: "Modelo",
        attributes: "Atributos",
        associations: "Asociaciones",
        rows: "Renglones",
        noData: "No hay datos para mostrar",
        noItemsAdded: "No se han agregado registros",
        save: "Guardar",
        uploading: "Importando",
        cancel: "Cancelar",
        close: "Cerrar",
        upload: "Subir",
        uploadHelper: "Por favor elija el archivo CSV que desea importar.",
        //delete confirmation dialog
        deleteMsg: "¿Está seguro que desea eliminar este elemento?",
        deleteReject: "No borrar",
        deleteAccept: "Sí, borrar",
        //save/update confirmation dialogs
        saveIncompleteAccept: "SÍ, GUARDAR",
        saveIncompleteReject: "NO GUARDAR TODAVÍA",
        updateAccept: "Entendido",
        cancelChangesAccept: "Sí, deseo salir",
        cancelChangesReject: "Permanecer",
        //noAcceptableFields
        invalidFields: "Algunos campos no son válidos.",
        invalidFieldsB: "Para continuar, por favor corrija estos campos.",
        //noIncompleteFields
        incompleteFields: "Algunos campos están vacíos.",
        incompleteFieldsB: "¿Desea continuar de todas formas?",
        //cancelChanges
        cancelChanges: "Los cambios no se han guardado.",
        cancelChangesB: "Algunos campos han sido editados, si continua sin guardar, estos cambios se perderán, ¿desea continuar?",


        //lists
        add: "Agregar",
        remove: "Eliminar",
        notAssociated: "No associados",
        noAssociations: "Sin asociaciones",
        toAdd: "Por agregar",
        transferToAdd: "Transferir a registros por agregar",
        untransferToAdd: "Quitar de registros por agregar",
        associated: "Associados",
        toRemove: "Por eliminar",
        transferToRemove: "Transferir a registros por eliminar",
        alreadyToRemove: "Ya está en los registros por eliminar",
        untransferToRemove: "Quitar de registros por eliminar",
        toAddHelperA: "Por favor seleccione ",
        toAddHelperB: " que desea asociar con este registro ",
        toRemoveHelperA: "Por favor seleccione ",
        toRemoveHelperB: " que desea desasociar de este registro ",
        theRecord: "el registro",
        theRecords: "los registros",

        //float & int
        floatMaxErr: "Este es un campo tipo Float, el máximo valor positivo válido es 1.79769313486231e+308. Valor ingresado: ",
        floatMinErr: "Este es un campo tipo Float, el mínimo valor negativo válido es -1.79769313486231e+308. Valor ingresado: ",
        intMaxErr: "Este es un campo tipo Int, el valor positivo máximo válido es 2147483647. Valor ingresado: ",
        intMinErr: "Este es un campo tipo Int, el valor negativo mínimo válido es -2147483647. Valor ingresado: ",
        intRoundedWarning: "Este es un campo tipo Int, los decimales serán redondeados. Valor tomado: ",
        valueTaken: "Valor tomado: ",
        invalidNumber: "Número no válido",
        number: "número",
        integer: "entero",
        invalidDate: "Formato de fecha no válido",

        //notistack
        gotIt: "Entendido",
        dismiss: "Descartar",

        messages: {
          msg1: "Los datos se han enviado. Un informe con el estatus del proceso de importación será enviado a su correo electrónico.",
          msg2: "Datos null recibidos: la consulta GraphQL no devolvió información.",
          msg3: "El archivo excede el límite de ",
          //delete
          msg4: "Registro borrado con éxito.",
          //update
          msg5: "Registro actualizado con éxito.",
          //create
          msg6: "Registro creado con éxito.",
        },
        errors: {
          e1: "Ocurrió un error al intentar ejecutar la consulta GraphQL. Por favor contacte al administrador de la aplicación.",
          e2: "Ocurrió un error al intentar ejecutar la consulta GraphQL, no se puede procesar la respuesta recibida del servidor. Por favor contacte al administrador de la aplicación.",
          e3: "La consulta GraphQL retornó una respuesta con errores. Por favor contacte al administrador de la aplicación.",
        }
      },
    }
  },
};

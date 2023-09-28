import { SweetAlertIcon } from "sweetalert2";

export const SweetAlertMessages = {
    createSuccess: {
      title: 'Başarılı' ,
      text: 'Film Başarıyla Eklendi',
      icon: 'success' as SweetAlertIcon, 
      useCancelButton: false,
      confirmButtonText: 'Tamam',
      cancelButtonText: '',
      timer: 3,
    },
    deleteConfirmation: {
      title: 'Silmek istiyor musunuz?',
      text: 'Bu işlem geri alınamaz!',
      icon: 'warning' as SweetAlertIcon, 
      useCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
    },
    deleteSuccess: {
      title: 'Silindi',
      text: 'Film başarıyla kaldırıldı',
      icon: 'success' as SweetAlertIcon, 
      useCancelButton: false,
      confirmButtonText: 'Tamam',
      cancelButtonText: '',
    },
    updateSuccess: {
      title: 'Başarılı' ,
      text: 'Film Başarıyla Güncellendi',
      icon: 'success' as SweetAlertIcon, 
      useCancelButton: false,
      confirmButtonText: 'Tamam',
      cancelButtonText: '',
      timer: 3,
    }
    // Diğer mesajlar burada tanımlanır
  };
  
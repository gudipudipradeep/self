import OpenSSL.crypto
import os


def cert_convert(pfx_file, pfx_pass, cert_gen_path):
    #Cert Convert
    file_full_path = os.path.join(cert_gen_path,  "private_key.pem")
    pfx = open(pfx_file, 'rb').read()
    p12 = OpenSSL.crypto.load_pkcs12(pfx, pfx_pass)

    with open(file_full_path, 'wb') as private_key:
        private_key.write(OpenSSL.crypto.dump_privatekey(OpenSSL.crypto.FILETYPE_PEM, p12.get_privatekey()))
    
    file_full_path = os.path.join(cert_gen_path,  "public_cer.pem")
    with open(file_full_path, 'wb') as public_cert:
        public_cert.write(OpenSSL.crypto.dump_certificate(OpenSSL.crypto.FILETYPE_PEM, p12.get_certificate()))
    
    file_full_path = os.path.join(cert_gen_path,  "ca_certificate.pem")
    ca = p12.get_ca_certificates()
    with open(file_full_path, 'wb') as ca_certificate:
        if ca is not None:
            for cert in ca:
                ca_certificate.write(OpenSSL.crypto.dump_certificate(OpenSSL.crypto.FILETYPE_PEM, cert))
                    
    return cert_gen_path